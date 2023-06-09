import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, user_profile } from './user.schema';
import { Store } from 'src/stores/store.schema';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { hashPassword } from '../utils/hassing.util';
import { handleImage } from 'src/utils/handle.image.util';

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

	async updateUser(_id: string, body: UserUpdateDto): Promise<User> {
		//유저 프로필
		const base64Image = body.profile;
		const imageUrl = await handleImage(base64Image, './uploads', '');

		//변경 비밀번호 해싱
		const pw = body.pw;
		const hashedPassword = await hashPassword(pw);

		const updateUser = {
			...body,
			pw: hashedPassword,
			profile: imageUrl,
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

	async updateFollow(user_id: string, target_id: string): Promise<User> {
		const user = await this.userModel.findById(user_id);
		const target = await this.userModel.findById(target_id);

		const followingInfo = {
			_id: user._id.toString(),
			nickname: user.nickname,
			profile: user.profile,
		};

		const followerInfo = {
			_id: target._id.toString(),
			nickname: target.nickname,
			profile: target.profile,
		};

		if (!user.following.includes(followerInfo)) {
			user.following.push(followerInfo);
		}

		if (!target.follower.includes(followingInfo)) {
			target.follower.push(followingInfo);
		}

		user.save();
		target.save();

		return user;
	}

	async updateUnfollow(user_id: string, target_id: string): Promise<User> {
		const user = await this.userModel.findById(user_id);
		const target = await this.userModel.findById(target_id);

		const followingInfo = {
			_id: user._id.toString(),
			nickname: user.nickname,
			profile: user.profile,
		};

		const followerInfo = {
			_id: target._id.toString(),
			nickname: target.nickname,
			profile: target.profile,
		};

		const userIndex = user.following.indexOf(followerInfo);
		const targetIndex = target.follower.indexOf(followingInfo);

		if (userIndex !== -1) {
			target.follower.splice(userIndex, 1);
		}
		if (targetIndex !== -1) {
			user.following.splice(targetIndex, 1);
		}

		user.save();
		target.save();

		return user;
	}

	async deleteUser(_id: string): Promise<User> {
		return await this.userModel.findByIdAndDelete(_id);
	}
}
