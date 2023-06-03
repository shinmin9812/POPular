import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostCreateDto } from './dto/post.create.dto';
import { PostUpdateDto } from './dto/post.update.dto';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get('gather')
  async getAllGatherPosts() {
    return await this.postsService.getAllGatherPosts();
  }

  @Get('review')
  async getAllReviewPosts() {
    return await this.postsService.getAllReviewPosts();
  }

  @Get('free')
  async getAllFreePosts() {
    return await this.postsService.getAllFreePosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  @Post()
  async createPost(@Body() createDto: PostCreateDto) {
    return await this.postsService.createPost(createDto);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() updateDto: PostUpdateDto) {
    return await this.postsService.updatePost(id, updateDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postsService.deletePost(id);
    return { message: '글이 삭제되었습니다.' };
  }
}