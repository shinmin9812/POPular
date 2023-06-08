import { IsEnum, IsMongoId, IsNotEmpty, ValidateIf } from 'class-validator';
import { NotificationType } from '../notification.schema';
import { BoardType } from 'src/feeds/feed.schema';
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
		example: 'qwer2134',
		description: '알림에서 참조할 데이터 ID (Follow: User / Comment/Recomment: Comment / Ad: Store)',
		required: true,
	})
	readonly content: Types.ObjectId;
}
