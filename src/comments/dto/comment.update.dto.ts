import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentUpdateDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '저요!',
		description: '댓글 내용',
		required: true,
	})
	readonly content: string;
}
