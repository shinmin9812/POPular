import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	NotFoundException,
	UseInterceptors,
	UploadedFiles,
	UseGuards,
	Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeedsService } from './feed.service';
import { FeedCreateDto } from './dto/feed.create.dto';
import { FeedUpdateDto } from './dto/feed.update.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('/feeds')
@ApiTags('Feed')
export class FeedsController {
	constructor(private readonly feedsService: FeedsService) {}

	@ApiOperation({ summary: '모든 게시글 찾기' })
	@Get()
	async getAllFeeds() {
		return await this.feedsService.getAllFeeds();
	}

	@ApiOperation({ summary: '게시글 페이지네이션' })
	@Get('pages')
	async getPaginate(@Query('page') page: number = 1) {
		return await this.feedsService.getPaginate(page);
	}

	@ApiOperation({ summary: '모집게시판 게시글 찾기' })
	@Get('gather')
	async getAllGatherFeeds() {
		return await this.feedsService.getAllGatherFeeds();
	}

	@ApiOperation({ summary: '후기게시판 게시글 찾기' })
	@Get('review')
	async getAllReviewFeeds() {
		return await this.feedsService.getAllReviewFeeds();
	}

	@ApiOperation({ summary: '자유게시판 게시글 찾기' })
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
	async createFeed(
		@Body() createDto: FeedCreateDto,
	) {
		return await this.feedsService.createFeed(createDto);
	}

	@ApiOperation({ summary: '게시글 수정하기' })
	@Patch(':id')
	async updateFeed(
		@Param('id') id: string,
		@Body() updateDto: FeedUpdateDto,
	) {
		return await this.feedsService.updateFeed(id, updateDto);
	}

	@ApiOperation({ summary: '게시글 삭제하기' })
	@Delete(':id')
	async deleteFeed(@Param('id') id: string) {
		await this.feedsService.deleteFeed(id);
		return { message: '글이 삭제되었습니다.' };
	}
}
