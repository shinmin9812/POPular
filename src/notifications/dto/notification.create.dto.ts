import { IsEnum, IsMongoId, IsNotEmpty, ValidateIf } from 'class-validator';
import { ContentModel, NotificationType } from '../notification.schema';
import { BoardType } from 'src/posts/post.schema';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationCreateDto {
	@IsEnum(NotificationType)
	@IsNotEmpty()
	@ApiProperty({
		example: 'Follow',
		description: '알림 종류',
		required: true,
	})
	readonly type: NotificationType;

	@IsEnum(BoardType)
	@ValidateIf(obj => obj.type === NotificationType.Comment)
	@ApiProperty({
		example: 'Gather',
		description: '알림이 온 게시판 종류',
	})
	readonly board: BoardType;

	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty({
		example: 'qwer2134',
		description: '알림 대상 ID',
		required: true,
	})
	readonly userId: Types.ObjectId;

	@IsNotEmpty()
	@IsMongoId()
	@ApiProperty({
		example: '귀여운 토끼님이 팔로우하셨습니다.',
		description: '알림 내용',
		required: true,
	})
	readonly content: Types.ObjectId;

	@IsNotEmpty()
	@IsEnum(ContentModel)
	@ApiProperty({
		example: 'User',
		description: '내용 모델',
		required: true,
	})
	readonly contentModel: ContentModel;
}
