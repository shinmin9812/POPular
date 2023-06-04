import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
	@IsString()
	@ApiProperty({
		example: '1.png',
		description: '유저 프로필 사진',
		required: true,
	})
	profile: string;

	@IsString()
	@ApiProperty({
		example: '스포츠와 커피를 좋아하는 엘리스입니다.',
		description: '유저 한 줄 소개',
		required: true,
	})
	introduce: string;

	@IsString()
	@ApiProperty({
		example: '귀여운 토끼',
		description: '유저 닉네임',
		required: true,
	})
	nickname: string;

	@IsString()
	@ApiProperty({
		example: 'qwer1234',
		description: '유저 비밀번호',
		required: true,
	})
	pw: string;

	@IsString()
	@ApiProperty({
		example: '010-1234-4321',
		description: '유저 전화번호',
		required: true,
	})
	phone_number: string;
}
