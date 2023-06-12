import {
	BadRequestException,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { Model, PaginateResult, Types, PaginateModel } from 'mongoose';
import { CommentCreateDto } from './dto/comment.create.dto';
import { CommentUpdateDto } from './dto/comment.update.dto';
import { FeedsService } from 'src/feeds/feed.service';
import { BoardType, Feed } from 'src/feeds/feed.schema';
import path from 'path';
import { UserService } from 'src/users/user.service';
import { NotificationsService } from 'src/notifications/notification.service';
import { NotificationType } from 'src/notifications/notification.schema';

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Comment.name)
		private readonly commentModel: PaginateModel<Comment>,
		@Inject(forwardRef(() => FeedsService)) private feedsService: FeedsService,
		@Inject(forwardRef(() => UserService)) private UserService: UserService,
		@Inject(forwardRef(() => NotificationsService))
		private NotificationsService: NotificationsService,
	) {}

	async getAllComments(): Promise<Comment[]> {
		try {
			const comments = await this.commentModel.find().populate('author').exec();

			return comments;
		} catch (err) {
			throw new InternalServerErrorException(
				'댓글 목록 불러오기를 실패했습니다.',
			);
		}
	}

	async getCommentById(id: string): Promise<Comment> {
		try {
			const comment = await this.commentModel
				.findById(id)
				.populate('author')
				.exec();

			if (!comment) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 댓글을 찾지 못했습니다.`,
				);
			}

			if (comment.parent.type === 'Feed') {
				await comment.populate({ path: 'parent.id', model: 'Feed' });
			} else if (comment.parent.type === 'Comment') {
				await comment.populate({ path: 'parent.id', model: 'Comment' });
			}

			return comment;
		} catch (err) {
			throw new BadRequestException(
				`'${id}' 아이디를 가진 댓글을 불러오지 못했습니다.`,
			);
		}
	}

	async getPaginationByUserId(
		id: string,
		pageIndex: number,
		order: string,
	): Promise<PaginateResult<Comment>> {
		let sort: { [key: string]: number } = { createdAt: -1 };

		if (order === 'desc') {
			sort = { createdAt: -1 };
		} else if (order === 'asc') {
			sort = { createdAt: 1 };
		}

		return this.commentModel.paginate(
			{ author: id },
			{
				sort,
				page: pageIndex,
				limit: 5,
			},
		);
	}

	async createComment(commentCreateDto: CommentCreateDto): Promise<Comment> {
		try {
			const createdComment = new this.commentModel();
			createdComment.author = commentCreateDto.author;
			createdComment.content = commentCreateDto.content;
			createdComment.parent = commentCreateDto.parent;
			createdComment.recomments = [];

			const savedComment = await createdComment.save();

			async function generateBoardType(
				savedComment: Comment,
				feedsService: FeedsService,
				commentsService: CommentsService,
			): Promise<BoardType> {
				if (savedComment.parent.type === 'Feed') {
					const thisParent = feedsService.getFeedById(
						savedComment.parent.id.toString(),
					);
					const thisBoardType = (await thisParent).board;
					return thisBoardType;
				}
				const thisParent = commentsService.getCommentById(
					savedComment.parent.id.toString(),
				);
				const thisGrandparent = feedsService.getFeedById(
					(await thisParent).parent.id.toString(),
				);
				const thisBoardType = (await thisGrandparent).board;
				return thisBoardType;
			}

			const notificationCreateDto = {
				type:
					savedComment.parent.type === 'Comment'
						? NotificationType.RECOMMENT
						: NotificationType.COMMENT,
				board: await generateBoardType(savedComment, this.feedsService, this),
				user_id: commentCreateDto.author,
				content_comment: savedComment._id,
				content_store: null,
				content_user: null,
			};

			const createdNotification =
				await this.NotificationsService.createNotification(
					notificationCreateDto,
				);
			await this.UserService.updateNotification(
				savedComment.author,
				createdNotification._id,
			);

			if (savedComment.parent.type === 'Comment') {
				await this.addRecomment(savedComment.parent.id, savedComment._id);
			} else {
				await this.feedsService.addComment(
					savedComment.parent.id,
					savedComment._id,
				);
			}
			return savedComment;
		} catch (err) {
			if (err.name === 'ValidationError') {
				console.log(err);
				throw new BadRequestException('잘못된 데이터를 입력하셨습니다.');
			}
			console.log(err);
			throw new InternalServerErrorException('댓글 생성에 실패하였습니다.');
		}
	}

	async updateComment(
		id: string,
		commentUpdateDto: CommentUpdateDto,
	): Promise<Comment> {
		try {
			const updatedComment = await this.commentModel.findById(id).exec();

			if (!updatedComment) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 댓글을 찾지 못했습니다.`,
				);
			}

			Object.assign(updatedComment, commentUpdateDto);

			return await updatedComment.save();
		} catch (err) {
			if (err.name === 'ValidationError') {
				console.log(err);
				throw new BadRequestException('잘못된 데이터를 입력하셨습니다.');
			}

			throw new InternalServerErrorException('댓글 업데이트에 실패하였습니다.');
		}
	}

	async addRecomment(
		commentId: Types.ObjectId,
		recomment: Types.ObjectId,
	): Promise<Comment> {
		return this.commentModel
			.findByIdAndUpdate(
				commentId,
				{ $push: { recomments: recomment } },
				{ new: true },
			)
			.exec();
	}

	async removeRecomment(
		commentId: Types.ObjectId,
		recomment: Types.ObjectId,
	): Promise<Comment> {
		return this.commentModel
			.findByIdAndUpdate(
				commentId,
				{ $pull: { recomments: recomment } },
				{ new: true },
			)
			.exec();
	}

	async deleteComment(id: string): Promise<void> {
		try {
			const deletedComment = await this.commentModel
				.findByIdAndRemove(id)
				.exec();

			if (!deletedComment) {
				throw new NotFoundException(
					`'${id}' 아이디를 가진 댓글을 찾지 못했습니다.`,
				);
			}
		} catch (err) {
			throw new InternalServerErrorException('댓글 삭제에 실패하였습니다.');
		}
	}
}
