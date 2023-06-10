import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	NotFoundException,
	UseGuards,
	Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeedsService } from './feed.service';
import { FeedCreateDto } from './dto/feed.create.dto';
import { FeedUpdateDto } from './dto/feed.update.dto';
import { Feed } from './feed.schema';
import { Types } from 'mongoose';

@Controller('/feeds')
@ApiTags('Feed')
export class FeedsController {
	constructor(private readonly feedsService: FeedsService) {}

	@ApiOperation({ summary: '모든 게시글 조회' })
	@Get()
	async getAllFeeds() {
		return await this.feedsService.getAllFeeds();
	}

	@ApiOperation({ summary: '게시글 페이지네이션' })
	@Get('pages')
	async getPaginate(@Query('page') page: number = 1) {
		return await this.feedsService.getPaginate(page);
	}

	@ApiOperation({ summary: '모든 모집게시판 조회' })
	@Get('gather')
	async getAllGatherFeeds() {
		return await this.feedsService.getAllGatherFeeds();
	}

	@ApiOperation({ summary: '모든 후기게시판 조회' })
	@Get('review')
	async getAllReviewFeeds() {
		return await this.feedsService.getAllReviewFeeds();
	}

	@ApiOperation({ summary: '모든 자유게시판 조회' })
	@Get('free')
	async getAllFreeFeeds() {
		return await this.feedsService.getAllFreeFeeds();
	}

	@ApiOperation({ summary: 'ID로 게시글 찾기' })
	@Get(':id')
	async getFeedById(@Param('id') id: string) {
		return await this.feedsService.getFeedById(id);
	}

	@ApiOperation({ summary: '게시글 등록하기' })
	@Post()
	async createFeed(@Body() createDto: FeedCreateDto): Promise<Feed> {
		return await this.feedsService.createFeed(createDto);
	}

	@ApiOperation({ summary: '게시글 수정하기' })
	@Patch(':id')
	async updateFeed(
		@Param('id') id: string,
		@Body() updateDto: FeedUpdateDto,
	): Promise<Feed> {
		return await this.feedsService.updateFeed(id, updateDto);
	}

	@ApiOperation({ summary: '게시글 좋아요 추가 및 삭제' })
	@Patch(':id/like')
	async addLike(
		@Param('id') feedId: Types.ObjectId,
		@Body() updateFeedDto: FeedUpdateDto,
	): Promise<Feed> {
		const { like } = updateFeedDto;
		return this.feedsService.addLike(feedId, like);
	}


	@ApiOperation({ summary: '게시글 신고 추가 및 삭제' })
	@Patch(':id/report')
	async addReport(
		@Param('id') feedId: Types.ObjectId,
		@Body() updateFeedDto: FeedUpdateDto,
	): Promise<Feed> {
		const { report } = updateFeedDto;
		return this.feedsService.addReport(feedId, report);
	}


	@ApiOperation({ summary: '게시글 댓글 추가' })
	@Patch(':id/comment')
	async addComment(
		@Param('id') feedId: Types.ObjectId,
		@Body() updateFeedDto: FeedUpdateDto,
	): Promise<Feed> {
		const { comment } = updateFeedDto;
		return this.feedsService.addComment(feedId, comment);
	}

	@ApiOperation({ summary: '게시글 댓글 삭제' })
	@Delete(':id/comment')
	async removeComment(
		@Param('id') feedId: Types.ObjectId,
		@Body() updateFeedDto: FeedUpdateDto,
	): Promise<Feed> {
		const { comment } = updateFeedDto;
		return this.feedsService.removeComment(feedId, comment);
	}

	@ApiOperation({ summary: '게시글 삭제하기' })
	@Delete(':id')
	async deleteFeed(@Param('id') id: string) {
		await this.feedsService.deleteFeed(id);
		return { message: '글이 삭제되었습니다.' };
	}
}
