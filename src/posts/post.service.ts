import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';
import { PostCreateDto } from './dto/post.create.dto';
import { PostUpdateDto } from './dto/post.update.dto';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name) private readonly postModel: Model<Post>,
	) {}

	async getAllPosts(): Promise<Post[]> {
		try {
			return await this.postModel.find().exec();
		} catch (err) {
			console.log(err);
			throw new Error('Failed to get posts.');
		}
	}

	async getPostById(_id: string): Promise<Post> {
		try {
			return await this.postModel.findById(_id).exec();
		} catch (err) {
			console.log(err);
			throw new Error(`Failed to get post by ID '${_id}'.`);
		}
	}

	async createPost(postCreateDto: PostCreateDto): Promise<Post> {
		try {
			const createdPost = new this.postModel(postCreateDto);
			return await createdPost.save();
		} catch (err) {
			console.log(err);
			throw new Error('Failed to create post.');
		}
	}

	async updatePost(_id: string, postUpdateDto: PostUpdateDto): Promise<Post> {
		try {
			return await this.postModel
				.findByIdAndUpdate(_id, postUpdateDto, { new: true })
				.exec();
		} catch (err) {
			console.log(err);
			throw new Error(`Failed to update post by ID '${_id}'.`);
		}
	}

	async deletePost(_id: string): Promise<void> {
		try {
			await this.postModel.findByIdAndRemove(_id).exec();
		} catch (err) {
			console.log(err);
			throw new Error(`Failed to delete post by ID '${_id}'.`);
		}
	}
}
