import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { hashPassword } from '../utils/hassing.util';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async getAllUsers(): Promise<User[]> {
		return await this.userModel.find();
	}

	async getUserByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email });
	}

	async getUserById(_id: string): Promise<User> {
		return await this.userModel.findById({ _id });
	}

	async createUser(body: UserSignupDto): Promise<User> {
		const { email, pw, name, nickname, phone_number, allow_notification } =
			body;

		const hashedPassword = await hashPassword(pw);

		const newUser = {
			email,
			pw: hashedPassword,
			name,
			nickname,
			phone_number,
			allow_notification,
		};

		return await this.userModel.create(newUser);
	}

	async updateUser(_id: string, body: UserUpdateDto): Promise<User> {
		const { profile, introduce, nickname, pw, phone_number } = body;

		const hashedPassword = await hashPassword(pw);

		const updateUser = {
			profile,
			introduce,
			nickname,
			pw: hashedPassword,
			phone_number,
		};
		return await this.userModel.findByIdAndUpdate({ _id }, updateUser, {
			new: true,
		});
	}

	async deleteUser(_id: string): Promise<User> {
		return await this.userModel.findByIdAndDelete(_id);
	}
}
