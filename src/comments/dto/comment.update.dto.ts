import {
	IsString,
	IsNotEmpty,
} from 'class-validator';

export class CommentUpdateDto {
	@IsString()
	@IsNotEmpty()
	readonly content: string;
}
