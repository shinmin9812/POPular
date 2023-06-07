import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentCreateDto } from './dto/comment.create.dto';
import { CommentUpdateDto } from './dto/comment.update.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/comments')
@ApiTags('Comment')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiOperation({ summary: '모든 댓글 조회' })
	@Get()
	async getAllComments() {
		return await this.commentsService.getAllComments();
	}

	@ApiOperation({ summary: 'ID로 댓글 조회' })
	@Get(':id')
	async getCommentById(@Param('id') id: string) {
		return await this.commentsService.getCommentById(id);
	}

	@ApiOperation({ summary: '댓글 추가하기' })
	@ApiBearerAuth('Authorization')
	@Post()
	@UseGuards(AuthGuard)
	async createComment(@Body() createDto: CommentCreateDto) {
		return await this.commentsService.createComment(createDto);
	}

	@ApiOperation({ summary: '댓글 수정하기' })
	@ApiBearerAuth('Authorization')
	@Patch(':id')
	@UseGuards(AuthGuard)
	async updateComment(
		@Param('id') id: string,
		@Body() updateDto: CommentUpdateDto,
	) {
		return await this.commentsService.updateComment(id, updateDto);
	}

	@ApiOperation({ summary: '댓글 삭제하기' })
	@ApiBearerAuth('Authorization')
	@Delete(':id')
	@UseGuards(AuthGuard)
	async deleteComment(@Param('id') id: string) {
		await this.commentsService.deleteComment(id);
		return { message: '댓글이 삭제되었습니다.' };
	}
}
