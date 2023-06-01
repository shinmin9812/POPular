import {
	IsString,
	IsArray,
	IsObject,
	IsNumber,
	IsBoolean,
	IsNotEmpty,
} from 'class-validator';

export class StoreRequestDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	brand: string;

	@IsString()
	@IsNotEmpty()
	startDate: string;

	@IsString()
	@IsNotEmpty()
	endDate: string;

	@IsObject()
	@IsNotEmpty()
	hours: {
		mon: {
			start: string | null;
			end: string | null;
		};
		tue: {
			start: string | null;
			end: string | null;
		};
		wed: {
			start: string | null;
			end: string | null;
		};
		thu: {
			start: string | null;
			end: string | null;
		};
		fri: {
			start: string | null;
			end: string | null;
		};
		sat: {
			start: string | null;
			end: string | null;
		};
		sun: {
			start: string | null;
			end: string | null;
		};
	};

	@IsString()
	@IsNotEmpty()
	location: string;

	@IsObject()
	@IsNotEmpty()
	coord: {
		lat: string;
		lng: string;
	};

	@IsNumber()
	@IsNotEmpty()
	price: number | null;

	@IsArray()
	sns: [
		{
			linkType: string;
			linkTitle: string;
			link: string;
		},
	];

	@IsBoolean()
	@IsNotEmpty()
	reservationRequired: boolean;

	@IsArray()
	images: Array<string>;

	@IsNumber()
	scrap: number;
}
