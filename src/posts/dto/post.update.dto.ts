import { IsString, IsOptional, IsNumber, Min, Max, IsArray, IsNotEmpty } from 'class-validator';

export class PostUpdateDto {
  @IsString()
	@IsNotEmpty()
	id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsString()
  storeId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  ratings?: number;
}