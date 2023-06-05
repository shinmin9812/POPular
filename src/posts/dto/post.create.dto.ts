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
	IsMongoId,
} from 'class-validator';
import { BoardType } from '../post.schema';

export class PostCreateDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsMongoId()
	@IsNotEmpty()
	readonly author: string;

	@IsEnum(BoardType)
	@IsNotEmpty()
	readonly board: BoardType;

	@IsString()
	@IsNotEmpty()
	readonly content: string;

	@IsMongoId()
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

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	readonly images?: string[];

	@IsOptional()
	@IsArray()
	readonly likes?: string[];

	@IsOptional()
	@IsArray()
	readonly reports?: string[];

	@IsOptional()
	@IsArray()
	readonly comments?: string[];
}
