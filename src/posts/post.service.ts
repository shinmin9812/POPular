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

	async getPostsByBoard(board?: string): Promise<Post[]> {
    try {
      let query = this.postModel.find();

      if (board) {
        query = query.where('board', board);
      }

      const posts = await query
        .populate('author')
        .populate('storeId')
        .exec();

      return posts;
    } catch (err) {
      throw new InternalServerErrorException("글 목록 불러오기를 실패했습니다.");
    }
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.getPostsByBoard();
  }

  async getAllGatherPosts(): Promise<Post[]> {
    return await this.getPostsByBoard('gather');
  }

  async getAllReviewPosts(): Promise<Post[]> {
    return await this.getPostsByBoard('review');
  }

  async getAllFreePosts(): Promise<Post[]> {
    return await this.getPostsByBoard('free');
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
      const createdPost = new this.postModel();
      createdPost.title = postCreateDto.title;
      createdPost.author = postCreateDto.author;
      createdPost.board = postCreateDto.board;
      createdPost.content = postCreateDto.content;
      createdPost.images = postCreateDto.images;
      createdPost.storeId = postCreateDto.storeId;
      createdPost.ratings = postCreateDto.ratings;
      createdPost.likes = postCreateDto.likes;
      createdPost.reports = postCreateDto.reports;
      createdPost.comments = postCreateDto.comments;
      createdPost.views = postCreateDto.views;

      return await createdPost.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException("잘못된 데이터를 입력하셨습니다.");
      }
			console.error(err);
      throw new InternalServerErrorException("글 생성에 실패하였습니다.");
    }
  }

  async updatePost(id: string, postUpdateDto: PostUpdateDto): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).exec();
      
      if (!post) {
        throw new NotFoundException(`'${id}' 아이디를 가진 글을 찾지 못했습니다.`);
      }
      
      Object.assign(post, postUpdateDto);
      
      return await post.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException("잘못된 데이터를 입력하셨습니다.");
      }
      
      throw new InternalServerErrorException("글 업데이트에 실패하였습니다.");
    }
  }

  async incrementViewCount(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).exec();

      if (!post) {
        throw new NotFoundException(`'${id}' 아이디를 가진 게시글을 찾지 못했습니다.`);
      }

      post.views += 1;

      return await post.save();
    } catch (err) {
      throw new InternalServerErrorException("조회수 증가에 실패하였습니다.");
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
