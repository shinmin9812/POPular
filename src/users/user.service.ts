import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { Store } from 'src/stores/store.schema';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { hashPassword } from '../utils/hassing.util';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
		@InjectModel(Store.name) private readonly storeModel: Model<Store>,
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

	async checkDuplicateNickname(nickname: string): Promise<string> {
		const existingUser = await this.userModel.findOne({ nickname });
		return JSON.stringify({ isExists: !!existingUser });
	}

	async checkDuplicateEmail(email: string): Promise<string> {
		const existingUser = await this.userModel.findOne({ email });
		return JSON.stringify({ isExists: !!existingUser });
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

	async updateScrap(userId: string, storeId: string): Promise<User> {
		const user = await this.userModel.findById(userId);
		const store = await this.storeModel.findById(storeId);

		const storeObjId = new Types.ObjectId(storeId);
		const userObjId = new Types.ObjectId(userId);

		if (user && store) {
			if (!user.scrap.includes(storeObjId)) {
				user.scrap.push(storeObjId);
			}
			if (!store.scrap.includes(userObjId)) {
				store.scrap.push(userObjId);
			}

			user.save();
			store.save();
		}

		return user;
	}

	async updateUnscrap(userId: string, storeId: string): Promise<User> {
		const user = await this.userModel.findById(userId);
		const store = await this.storeModel.findById(storeId);

		const storeObjId = new Types.ObjectId(storeId);
		const userObjId = new Types.ObjectId(userId);

		if (user && store) {
			const sIndex = user.scrap.indexOf(storeObjId);
			const uIndex = store.scrap.indexOf(userObjId);

			if (sIndex !== -1) {
				user.scrap.splice(sIndex, 1);
			}

			if (uIndex !== -1) {
				store.scrap.splice(uIndex, 1);
			}

			await user.save();
			await store.save();
		}

		return user;
	}

	async deleteUser(_id: string): Promise<User> {
		return await this.userModel.findByIdAndDelete(_id);
	}
}
