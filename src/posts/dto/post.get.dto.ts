import {
	IsString,
	IsArray,
	IsNumber,
	IsNotEmpty,
	IsEnum,
	IsOptional,
	Min,
	Max,
	ValidateIf,
} from 'class-validator';
import { BoardType } from '../post.schema';

export class PostGetDto {
	@IsString()
	title: string;

	@IsString()
	author: string;

	@IsEnum(BoardType)
	board: BoardType;

	@IsString()
	content: string;

	@IsString()
	@ValidateIf(
		obj => obj.board === BoardType.Review || obj.board === BoardType.Gather,
	)
	storeId?: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(5)
	@ValidateIf(obj => obj.board === BoardType.Review)
	ratings?: number;

	@IsArray()
	images?: string[];

	@IsNumber()
	likes: number;

	@IsArray()
	reports: string[];

	@IsArray()
	comments: number[];
}
