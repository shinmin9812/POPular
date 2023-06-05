import { IsString, IsArray, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CommentCreateDto {
	@IsMongoId()
	@IsNotEmpty()
	@ApiProperty({
		example: 'qqwe2134',
		description: '댓글 작성자 ID',
		required: true,
	})
	readonly author: Types.ObjectId;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '저요!',
		description: '댓글 내용',
		required: true,
	})
	readonly content: string;

	@IsArray()
	@ApiProperty({
		example: '저도 갈래요',
		description: '대댓글',
	})
	readonly recomments: ObjectId[];
}
