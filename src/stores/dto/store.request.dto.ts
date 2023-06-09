import {
	IsString,
	IsArray,
	IsNumber,
	IsBoolean,
	IsDate,
	IsNotEmpty,
	ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class time {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '08:00',
		description: '스토어 시작 시간',
		required: true,
	})
	start: string | null;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '08:00',
		description: '스토어 종료 시간',
		required: true,
	})
	end: string | null;
}

class day {
	@ValidateNested()
	@IsNotEmpty()
	mon: time;

	@ValidateNested()
	@IsNotEmpty()
	tue: time;

	@ValidateNested()
	@IsNotEmpty()
	wed: time;

	@ValidateNested()
	@IsNotEmpty()
	thu: time;

	@ValidateNested()
	@IsNotEmpty()
	fri: time;

	@ValidateNested()
	@IsNotEmpty()
	sat: time;

	@ValidateNested()
	@IsNotEmpty()
	sun: time;
}

class postinfo {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '대구',
		description: '스토어 위치(시)',
		required: true,
	})
	sido: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '중구',
		description: '스토어 위치(군/구)',
		required: true,
	})
	sigungu: string;
}

class coordinfo {
	@IsString()
	@ApiProperty({
		example: 'Point',
		description: '스토어 위치 검색용(Point 고정)',
		required: true,
	})
	type: string;

	@IsArray()
	@ApiProperty({
		example: '[127.23414, 34.1234]',
		description: '스토어 위치 검색용(좌표)',
		required: true,
	})
	coordinates: number[];
}

class snsinfo {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'insta',
		description: '스토어 SNS 종류',
		required: true,
	})
	link_type: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '블루보틀 인스타그램',
		description: '스토어 SNS 이름',
		required: true,
	})
	link_title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: 'http://www.instagram.com',
		description: '스토어 SNS 링크 주소',
		required: true,
	})
	link_url: string;
}

export class StoreRequestDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '홍대 팝업 스토어',
		description: '팝업 스토어 이름',
		required: true,
	})
	title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '홍대 팝업 스토어 오픈! ...',
		description: '팝업 스토어 설명',
		required: true,
	})
	description: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '의류',
		description: '팝업 스토어 종류',
		required: true,
	})
	category: string;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	@ApiProperty({
		example: '2023-05-31T12:34:56.789Z',
		description: '팝업 스토어 시작일',
		required: true,
	})
	start_date: Date;

	@IsDate()
	@IsNotEmpty()
	@Type(() => Date)
	@ApiProperty({
		example: '2023-05-31T12:34:56.789Z',
		description: '팝업 스토어 종료일',
		required: true,
	})
	end_date: Date;

	@ValidateNested()
	@IsNotEmpty()
	@ApiProperty({
		example: '{{mon: {08:00, 18:00} ... }}',
		description: '팝업 스토어 운영시간',
		required: true,
	})
	hours: day;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: '서울시 성동구 OOO',
		description: '팝업 스토어 위치',
		required: true,
	})
	location: string;

	@ValidateNested()
	@IsNotEmpty()
	@ApiProperty({
		example: '{ sido: 대구, sigungu: 중구 }',
		description: '팝업 스토어 시, 군/구',
		required: true,
	})
	postcode: postinfo;

	@ValidateNested()
	@IsNotEmpty()
	@ApiProperty({
		example: '{ type: Point, coordinates: [127.6346, 34.1245](경도, 위도 순) }',
		description: '팝업 스토어 위치 좌표',
		required: true,
	})
	coord: coordinfo;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: '3000',
		description: '팝업 스토어 입장료',
		required: true,
	})
	price: number;

	@IsArray()
	@IsNotEmpty({ each: true })
	@ValidateNested({ each: true })
	@ApiProperty({
		example: '[{insta, 홍대 인스타그램, http://...}]',
		description: '팝업 스토어 SNS 정보',
	})
	sns: snsinfo[];

	@IsBoolean()
	@IsNotEmpty()
	@ApiProperty({
		example: 'true',
		description: '팝업 스토어 예약 필요 여부',
		required: true,
	})
	reservation_required: boolean;

	@IsArray()
	@ApiProperty({
		example: '[1.png, 2.png]',
		description: '팝업 스토어 이미지',
	})
	images: string[];

	@IsArray()
	@ApiProperty({
		example: '[123, 424, 124]',
		description: '팝업 스토어 스크랩 리스트',
		required: true,
	})
	scrap: Types.ObjectId[];
}
