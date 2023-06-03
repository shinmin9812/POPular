import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "./post.schema";
import { PostCreateDto } from "./dto/post.create.dto";
import { PostUpdateDto } from "./dto/post.update.dto";


@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

	async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find()
        .populate('author')
        .populate('storeId')
        .exec();
  
      return posts;
    } catch (err) {
      throw new InternalServerErrorException("전체 글 목록 불러오기를 실패했습니다.");
    }
  }

	async getAllGatherPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({board: 'gather'})
        .populate('author')
        .populate('storeId')
        .exec();
  
      return posts;
    } catch (err) {
      throw new InternalServerErrorException("모집게시판 글 목록 불러오기를 실패했습니다.");
    }
  }

	async getAllReviewPosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({board: 'review'})
        .populate('author')
        .populate('storeId')
        .exec();
  
      return posts;
    } catch (err) {
      throw new InternalServerErrorException("후기게시판 글 목록 불러오기를 실패했습니다.");
    }
  }

	async getAllFreePosts(): Promise<Post[]> {
    try {
      const posts = await this.postModel.find({board: 'free'})
        .populate('author')
        .exec();
  
      return posts;
    } catch (err) {
      throw new InternalServerErrorException("자유게시판 글 목록 불러오기를 실패했습니다.");
    }
  }

  async getPostById(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id)
      .populate('author')
      .populate('storeId')
      .exec();
      
      if (!post) {
        throw new NotFoundException(`'${id}' 아이디를 가진 글을 찾지 못했습니다.`);
      }

      return post;
    } catch (err) {
      throw new BadRequestException(`'${id}' 아이디를 가진 글을 불러오지 못했습니다.`);
    }
  }

  async createPost(postCreateDto: PostCreateDto): Promise<Post> {
    try {
      const createdPost = new this.postModel(postCreateDto);
      return await createdPost.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException("잘못된 데이터를 입력하셨습니다.");
      }
      throw new InternalServerErrorException("글 생성에 실패하였습니다.");
    }
  }

  async updatePost(id: string, postUpdateDto: PostUpdateDto): Promise<Post> {
    try {
      const updatedPost = await this.postModel.findByIdAndUpdate(id, postUpdateDto, { new: true }).exec();
      
      if (!updatedPost) {
        throw new NotFoundException(`'${id}' 아이디를 가진 글을 찾지 못했습니다.`);
      }
      
      return updatedPost;
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException("잘못된 데이터를 입력하셨습니다.");
      }
      
      throw new InternalServerErrorException("글 업데이트에 실패하였습니다.");
    }
  }

	async deletePost(id: string): Promise<void> {
    try {
      const deletedPost = await this.postModel.findByIdAndRemove(id).exec();
      
      if (!deletedPost) {
        throw new NotFoundException(`'${id}' 아이디를 가진 글을 찾지 못했습니다.`);
      }
      
    } catch (err) {
      throw new InternalServerErrorException('글 삭제에 실패하였습니다.');
    }
  }
}
