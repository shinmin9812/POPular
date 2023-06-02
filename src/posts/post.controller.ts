import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post.create.dto';
import { PostUpdateDto } from './dto/post.update.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts() {
    const posts = await this.postService.getAllPosts();
    return posts;
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const post = await this.postService.getPostById(id);
    return post;
  }

  @Post()
  async createPost(@Body() createDto: PostCreateDto) {
    const createdPost = await this.postService.createPost(createDto);
    return createdPost;
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() updateDto: PostUpdateDto) {
    const updatedPost = await this.postService.updatePost(id, updateDto);
    return updatedPost;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
    return { message: 'Post deleted successfully' };
  }
}