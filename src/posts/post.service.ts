import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostCreateDto } from './dto/post.create.dto';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name) private readonly postModel: Model<Post>,
	) {}

	async getAllPost() {
		try {
			const result = await this.postModel.find();
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	async getPostById(_id: string) {
		try {
			const result = await this.postModel.findOne({ _id });
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	async createPost(body: PostCreateDto) {}
}
