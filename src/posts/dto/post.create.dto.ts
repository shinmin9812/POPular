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

export class PostCreateDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsString()
	@IsNotEmpty()
	readonly author: string;

	@IsEnum(BoardType)
	@IsNotEmpty()
	readonly board: BoardType;

	@IsString()
	@IsNotEmpty()
	readonly content: string;

	@IsString()
	@IsNotEmpty()
	@ValidateIf(
		obj => obj.board === BoardType.Review || obj.board === BoardType.Gather,
	)
	readonly storeId: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(5)
	@ValidateIf(obj => obj.board === BoardType.Review)
	readonly ratings?: number;

	@IsArray()
	readonly images: string[];

	@IsNumber()
	readonly likes: number;

	@IsArray()
	readonly reports: string[];

	@IsArray()
	readonly comments: number[];
}
