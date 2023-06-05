import {
	IsString,
	IsArray,
	IsNotEmpty,
  IsMongoId,
} from 'class-validator';
import { ObjectId, Types } from 'mongoose';

export class CommentCreateDto {
	@IsMongoId()
	@IsNotEmpty()
	readonly author: Types.ObjectId;

	@IsString()
	@IsNotEmpty()
	readonly content: string;

	@IsArray()
	readonly recomments: ObjectId[];
}
