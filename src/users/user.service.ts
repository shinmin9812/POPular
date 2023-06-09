import { BadRequestException, Injectable } from '@nestjs/common';
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
		const pw = body.pw;
		const hashedPassword = await hashPassword(pw);

		const newUser = {
			...body,
			pw: hashedPassword,
		};

		return await this.userModel.create(newUser);
	}

	async updateUser(
		_id: string,
		body: UserUpdateDto,
		pathName: string,
	): Promise<User> {
		const pw = body.pw;
		const hashedPassword = await hashPassword(pw);

		const updateUser = {
			...body,
			profile: pathName,
			pw: hashedPassword,
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

		console.log(store.scraps);

		if (user && store) {
			if (!user.scraps.includes(storeObjId)) {
				user.scraps.push(storeObjId);
			}
			if (!store.scraps.includes(userObjId)) {
				store.scraps.push(userObjId);
			}

			user.save();
			store.save();
		} else {
			throw new BadRequestException({ message: '제대로 값을 못 받아옴' });
		}

		return user;
	}

	async updateUnscrap(userId: string, storeId: string): Promise<User> {
		const user = await this.userModel.findById(userId);
		const store = await this.storeModel.findById(storeId);

		const storeObjId = new Types.ObjectId(storeId);
		const userObjId = new Types.ObjectId(userId);

		if (user && store) {
			const sIndex = user.scraps.indexOf(storeObjId);
			const uIndex = store.scraps.indexOf(userObjId);

			if (sIndex !== -1) {
				user.scraps.splice(sIndex, 1);
			}

			if (uIndex !== -1) {
				store.scraps.splice(uIndex, 1);
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
