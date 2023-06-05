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
import { Types } from 'mongoose';

export class PostCreateDto {
	@IsString()
	@IsNotEmpty()
	readonly title: string;

	@IsMongoId()
	@IsNotEmpty()
	readonly author: Types.ObjectId;

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
	readonly storeId: Types.ObjectId;

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
	readonly likes?: Types.ObjectId[];

	@IsOptional()
	@IsArray()
	readonly reports?: Types.ObjectId[];

	@IsOptional()
	@IsArray()
	readonly comments?: Types.ObjectId[];

	@IsNumber()
	readonly views: number;
}
