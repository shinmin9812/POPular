import {
	IsString,
	IsEnum,
	IsOptional,
	IsNumber,
	Min,
	Max,
	IsArray,
	ArrayMinSize,
} from 'class-validator';

export class PostUpdateDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	content?: string;

	@IsOptional()
	@IsArray()
	@ArrayMinSize(1)
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
