import {
	Injectable,
	NotFoundException,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feed } from './feed.schema';
import { FeedCreateDto } from './dto/feed.create.dto';
import { FeedUpdateDto } from './dto/feed.update.dto';

@Injectable()
export class FeedsService {
	constructor(
		@InjectModel(Feed.name) private readonly feedModel: Model<Feed>,
	) {}

	async getFeedsByBoard(board?: string): Promise<Feed[]> {
		try {
			let query = this.feedModel.find();

			if (board) {
				query = query.where('board', board);
			}

			const feeds = await query.populate('author').populate('storeId').exec();

			return feeds;
		} catch (err) {
			throw new InternalServerErrorException(
				'글 목록 불러오기를 실패했습니다.',
			);
		}
	}

	async getAllFeeds(): Promise<Feed[]> {
		return await this.getFeedsByBoard();
	}

	async getAllGatherFeeds(): Promise<Feed[]> {
		return await this.getFeedsByBoard('gather');
	}

	async getAllReviewFeeds(): Promise<Feed[]> {
		return await this.getFeedsByBoard('review');
	}

	async getAllFreeFeeds(): Promise<Feed[]> {
		return await this.getFeedsByBoard('free');
	}

	async getFeedById(id: string): Promise<Feed> {
		try {
			const feed = await this.feedModel
				.findById(id)
				.populate('author')
				.populate('storeId')
				.exec();

			if (!feed) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 글을 찾지 못했습니다.`,
				);
			}

			return feed;
		} catch (err) {
			throw new BadRequestException(
				`'${id}' 아이디를 가진 글을 불러오지 못했습니다.`,
			);
		}
	}

	async createFeed(feedCreateDto: FeedCreateDto): Promise<Feed> {
		try {
			const createdFeed = new this.feedModel();
			createdFeed.title = feedCreateDto.title;
			createdFeed.author = feedCreateDto.author;
			createdFeed.board = feedCreateDto.board;
			createdFeed.content = feedCreateDto.content;
			createdFeed.images = feedCreateDto.images;
			createdFeed.storeId = feedCreateDto.storeId;
			createdFeed.ratings = feedCreateDto.ratings;
			createdFeed.likes = feedCreateDto.likes;
			createdFeed.reports = feedCreateDto.reports;
			createdFeed.comments = feedCreateDto.comments;
			createdFeed.views = feedCreateDto.views;

			return await createdFeed.save();
		} catch (err) {
			if (err.name === 'ValidationError') {
				throw new BadRequestException('잘못된 데이터를 입력하셨습니다.');
			}
			console.error(err);
			throw new InternalServerErrorException('글 생성에 실패하였습니다.');
		}
	}

	async updateFeed(id: string, feedUpdateDto: FeedUpdateDto): Promise<Feed> {
		try {
			const feed = await this.feedModel.findById(id).exec();

			if (!feed) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 글을 찾지 못했습니다.`,
				);
			}

			Object.assign(feed, feedUpdateDto);

			return await feed.save();
		} catch (err) {
			if (err.name === 'ValidationError') {
				throw new BadRequestException('잘못된 데이터를 입력하셨습니다.');
			}

			throw new InternalServerErrorException('글 업데이트에 실패하였습니다.');
		}
	}

	async incrementViewCount(id: string): Promise<Feed> {
		try {
			const feed = await this.feedModel.findById(id).exec();

			if (!feed) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 게시글을 찾지 못했습니다.`,
				);
			}

			feed.views += 1;

			return await feed.save();
		} catch (err) {
			throw new InternalServerErrorException('조회수 증가에 실패하였습니다.');
		}
	}

	async deleteFeed(id: string): Promise<void> {
		try {
			const deletedFeed = await this.feedModel.findByIdAndRemove(id).exec();

			if (!deletedFeed) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 글을 찾지 못했습니다.`,
				);
			}
		} catch (err) {
			throw new InternalServerErrorException('글 삭제에 실패하였습니다.');
		}
	}
}
