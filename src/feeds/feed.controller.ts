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
import { multerConfig } from 'src/multer.config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
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
	@ApiBearerAuth('Authorization')
	@Post()
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileFieldsInterceptor(
			[{ name: 'images', maxCount: 5 }],
			multerConfig.storage,
		),
	)
	async createFeed(
		@Body() createDto: FeedCreateDto,
		@UploadedFiles() files: Express.Multer.File[],
	) {
		if (createDto.images.length > 0) {
			createDto.images = files.map((file: Express.Multer.File) => file.path);
		}

		return await this.feedsService.createFeed(createDto);
	}

	@ApiOperation({ summary: '게시글 수정하기' })
	@ApiBearerAuth('Authorization')
	@Patch(':id')
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileFieldsInterceptor(
			[{ name: 'images', maxCount: 5 }],
			multerConfig.storage,
		),
	)
	async updateFeed(
		@Param('id') id: string,
		@Body() updateDto: FeedUpdateDto,
		@UploadedFiles() files: Express.Multer.File[],
	) {
		if (updateDto.images.length > 0) {
			updateDto.images = files.map((file: Express.Multer.File) => file.path);
		}
		return await this.feedsService.updateFeed(id, updateDto);
	}

	@ApiOperation({ summary: '게시글 삭제하기' })
	@ApiBearerAuth('Authorization')
	@Delete(':id')
	@UseGuards(AuthGuard)
	async deleteFeed(@Param('id') id: string) {
		await this.feedsService.deleteFeed(id);
		return { message: '글이 삭제되었습니다.' };
	}
}
