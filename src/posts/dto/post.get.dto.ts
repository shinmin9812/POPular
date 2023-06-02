import {
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  Max,
  ValidateIf,
} from 'class-validator';
import { BoardType } from '../post.schema';
import { User } from '../../users/user.schema';
import { Store } from '../../stores/store.schema';

export class PostGetDto {
  @IsString()
  title: string;

  @IsString()
  author: string | User;

  @IsEnum(BoardType)
  board: BoardType;

  @IsString()
  content: string;

  @IsString()
  @ValidateIf(
    obj => obj.board === BoardType.Review || obj.board === BoardType.Gather,
  )
  storeId?: string | Store;

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