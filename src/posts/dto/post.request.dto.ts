import { IsString, IsArray, IsNumber, IsNotEmpty, IsEnum, IsOptional, Min, Max, ValidateIf } from 'class-validator';
import { BoardType } from '../post.schema';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(BoardType)
  @IsNotEmpty()
  board: BoardType;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((obj) => obj.board === BoardType.Review || obj.board === BoardType.Gather)
  storeId: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ValidateIf((obj) => obj.board === BoardType.Review)
  rating?: number;

  @IsArray()
  images: string[];

  @IsNumber()
  likes: number;

}