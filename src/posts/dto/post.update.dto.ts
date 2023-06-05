import {
	IsString,
	IsOptional,
	IsNumber,
	Min,
	Max,
	IsArray,
	IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostUpdateDto {
	@IsOptional()
	@IsString()
	@ApiProperty({
		example: '홍대 팝업스토어 같이 가실 분?',
		description: '게시글 제목',
	})
	title?: string;

	@IsOptional()
	@IsString()
	@ApiProperty({
		example: '6월 16일 같이 가실 분 구합니다!',
		description: '게시글 내용',
	})
	content?: string;

	@IsOptional()
	@IsArray()
	@ApiProperty({
		example: '[1.png, 2.png]',
		description: '게시글 이미지',
	})
	images?: string[];

	@IsOptional()
	@IsString()
	@ApiProperty({
		example: 'qwerra21341',
		description: '게시글에서 설정한 스토어 ID',
	})
	storeId?: string;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(5)
	@ApiProperty({
		example: '3.5',
		description: '게시글 평점',
	})
	ratings?: number;
}
