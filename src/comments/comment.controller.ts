import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentCreateDto } from './dto/comment.create.dto';
import { CommentUpdateDto, RecommentDto } from './dto/comment.update.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Types } from 'mongoose';
import { Comment } from './comment.schema';

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

	@ApiOperation({ summary: 'ID로 댓글 정보 조회' })
	@Get('info/:id')
	async getCommentInfoById(@Param('id') id: string) {
		return await this.commentsService.getCommentInfoById(id);
	}

	@ApiOperation({ summary: '유저가 작성한 댓글 페이지네이션 조회' })
	@Get('user/:userId')
	async getPagination(
		@Param('userId') id: string,
		@Query('pageIndex') pageIndex: number,
		@Query('order') order?: string,
	) {
		return await this.commentsService.getPaginationByUserId(
			id,
			pageIndex,
			order,
		);
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

	@ApiOperation({ summary: '대댓글 추가' })
	@Patch(':id/recomment')
	async addRecomment(
		@Param('id') commentId: Types.ObjectId,
		@Body() recommentDto: RecommentDto,
	): Promise<Comment> {
		return this.commentsService.addRecomment(commentId, recommentDto.recomment);
	}

	@ApiOperation({ summary: '대댓글 삭제' })
	@Delete(':id/recomment')
	async removeRecomment(
		@Param('id') commentId: Types.ObjectId,
		@Body() recommentDto: RecommentDto,
	): Promise<Comment> {
		return this.commentsService.removeRecomment(
			commentId,
			recommentDto.recomment,
		);
	}

	@ApiOperation({ summary: '댓글 삭제하기' })
	@ApiBearerAuth('Authorization')
	@Delete()
	@UseGuards(AuthGuard)
	async deleteComment(@Body('ids') ids: string[]) {
		await this.commentsService.deleteComment(ids);
		return { message: '댓글이 삭제되었습니다.' };
	}
}
