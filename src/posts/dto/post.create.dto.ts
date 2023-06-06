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
import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '홍대 팝업스토어 같이 가실 분?',
		description: '게시글 제목',
		required: true,
	})
	readonly title: string;

	@IsMongoId()
	@IsNotEmpty()
	@ApiProperty({
		example: '귀여운 토끼',
		description: '게시글 작성자',
		required: true,
	})
	readonly author: Types.ObjectId;

	@IsEnum(BoardType)
	@IsNotEmpty()
	@ApiProperty({
		example: 'Gather',
		description: '게시글 올릴 게시판 종류',
		required: true,
	})
	readonly board: BoardType;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '6월 16일 같이 가실 분 구합니다!',
		description: '게시글 내용',
		required: true,
	})
	readonly content: string;

	@IsMongoId()
	@IsNotEmpty()
	@ValidateIf(
		obj => obj.board === BoardType.Review || obj.board === BoardType.Gather,
	)
	@ApiProperty({
		example: 'qwerra21341',
		description: '게시글에서 설정한 스토어 ID',
		required: true,
	})
	readonly storeId: Types.ObjectId;

	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(5)
	@ValidateIf(obj => obj.board === BoardType.Review)
	@ApiProperty({
		example: '3.5',
		description: '게시글 평점',
	})
	readonly ratings?: number;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ApiProperty({
		example: '[1.png, 2.png]',
		description: '게시글 이미지',
	})
	images?: string[];

	@IsOptional()
	@IsArray()
	@ApiProperty({
		example: '[qwer1234, rewq431]',
		description: '게시글 좋아요 누른 유저 목록',
	})
	readonly likes?: Types.ObjectId[];

	@IsOptional()
	@IsArray()
	@ApiProperty({
		example: '[qwer1234, rewq431]',
		description: '게시글 신고 누른 유저 목록',
	})
	readonly reports?: Types.ObjectId[];

	@IsOptional()
	@IsArray()
	@ApiProperty({
		example: '[저요!, 까비요]',
		description: '게시글 댓글',
	})
	readonly comments?: Types.ObjectId[];

	@IsNumber()
	@ApiProperty({
		example: '4',
		description: '게시글 조회수',
	})
	readonly views: number;
}
