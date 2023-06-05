import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CommentsService } from "./comment.service";
import { CommentCreateDto } from "./dto/comment.create.dto";
import { CommentUpdateDto } from "./dto/comment.update.dto";

@Controller('/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    return await this.commentsService.getCommentById(id);
  }

  @Post()
  async createPost(@Body() createDto: CommentCreateDto) {
    return await this.commentsService.createComment(createDto);
  }

  @Patch(':id')
  async updateComment(@Param('id') id: string, @Body() updateDto: CommentUpdateDto) {
    return await this.commentsService.updateComment(id, updateDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id:string) {
    await this.commentsService.deleteComment(id);
    return { message: '댓글이 삭제되었습니다.'};
  }
}