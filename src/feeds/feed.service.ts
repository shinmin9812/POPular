import {
	Injectable,
	NotFoundException,
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Feed } from './feed.schema';
import { FeedCreateDto } from './dto/feed.create.dto';
import { FeedUpdateDto } from './dto/feed.update.dto';
import { extractImages } from 'src/utils/extract.images.util';
import { handleImages } from 'src/utils/handle.images.util';

@Injectable()
export class FeedsService {
	constructor(
		@InjectModel(Feed.name) private readonly feedModel: Model<Feed>,
	) {}

	async getAllFeeds(): Promise<Feed[]> {
		try {
			const feeds = await this.feedModel
				.find()
				.populate('author')
				.populate('store_id')
				.populate('comments')
				.exec();
			return feeds;
		} catch (err) {
			throw new InternalServerErrorException(
				'글 목록 불러오기를 실패했습니다.',
			);
		}
	}

	async getFeedsByBoard(board?: string): Promise<Feed[]> {
		try {
			let query = this.feedModel.find();

			if (board) {
				query = query.where('board', board);
			}

			const feeds = await query
				.populate('author')
				.populate('store_id')
				.populate('comments')
				.exec();

			return feeds;
		} catch (err) {
			throw new InternalServerErrorException(
				'글 목록 불러오기를 실패했습니다.',
			);
		}
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

	async getPaginate(page: number): Promise<Feed[]> {
		const limit = 7;
		const offset = (page - 1) * limit;

		const feeds = await this.feedModel.find().limit(limit).skip(offset);

		return feeds;
	}

	async getFeedById(id: string): Promise<Feed> {
		try {
			const feed = await this.feedModel
				.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
				.populate('author')
				.populate('store_id')
				.populate({
					path: 'comments',
					populate: [
						{
							path: 'recomments',
							model: 'Comment',
							populate: {
								path: 'author',
								model: 'User',
							},
						},
						{
							path: 'author',
							model: 'User',
						},
					],
				})
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
			const base64Images = extractImages(feedCreateDto.content);
			const imageMapping = await handleImages(base64Images);

			let updatedContent = feedCreateDto.content;
			for (const [imgData, imageUrl] of Object.entries(imageMapping)) {
				updatedContent = updatedContent.replace(imgData, imageUrl);
			}

			const createdFeed = new this.feedModel();
			createdFeed.title = feedCreateDto.title;
			createdFeed.author = feedCreateDto.author;
			createdFeed.board = feedCreateDto.board;
			createdFeed.content = updatedContent;
			createdFeed.images = Object.values(imageMapping);
			createdFeed.store_id = feedCreateDto.store_id;
			createdFeed.ratings = feedCreateDto.ratings;
			createdFeed.likes = [];
			createdFeed.reports = [];
			createdFeed.comments = [];
			createdFeed.views = 0;

			return await createdFeed.save();
		} catch (err) {
			if (err.name === 'ValidationError') {
				console.log(err);
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

			if (feedUpdateDto.like || feedUpdateDto.report || feedUpdateDto.comment) {
				throw new BadRequestException(
					'좋아요, 신고, 댓글 관련 Patch는 해당 API를 이용해주세요.',
				);
			}

			if (feedUpdateDto.content) {
				const base64Images = extractImages(feedUpdateDto.content);
				const imageMapping = await handleImages(base64Images);
				let updatedContent = feedUpdateDto.content;
				for (const [imgData, imageUrl] of Object.entries(imageMapping)) {
					updatedContent = updatedContent.replace(imgData, imageUrl);
				}
				feedUpdateDto.content = updatedContent;
				feedUpdateDto.images = Object.values(imageMapping);
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

	async addLike(feedId: Types.ObjectId, like: Types.ObjectId): Promise<Feed> {
		const liked = (await this.feedModel.findById(feedId)).likes.find(
			e => e === like,
		);
		if (liked) {
			return this.feedModel
				.findByIdAndUpdate(feedId, { $pull: { likes: like } }, { new: true })
				.exec();
		}
		return this.feedModel
			.findByIdAndUpdate(feedId, { $push: { likes: like } }, { new: true })
			.exec();
	}

	async addReport(
		feedId: Types.ObjectId,
		report: Types.ObjectId,
	): Promise<Feed> {
		const reported = (await this.feedModel.findById(feedId)).reports.find(
			e => e === report,
		);
		if (reported) {
			return this.feedModel
				.findByIdAndUpdate(
					feedId,
					{ $pull: { reports: report } },
					{ new: true },
				)
				.exec();
		}
		return this.feedModel
			.findByIdAndUpdate(feedId, { $push: { reports: report } }, { new: true })
			.exec();
	}

	async addComment(
		feedId: Types.ObjectId,
		comment: Types.ObjectId,
	): Promise<Feed> {
		return this.feedModel
			.findByIdAndUpdate(
				feedId,
				{ $push: { comments: comment } },
				{ new: true },
			)
			.exec();
	}

	async removeComment(
		feedId: Types.ObjectId,
		comment: Types.ObjectId,
	): Promise<Feed> {
		return this.feedModel
			.findByIdAndUpdate(
				feedId,
				{ $pull: { comments: comment } },
				{ new: true },
			)
			.exec();
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
