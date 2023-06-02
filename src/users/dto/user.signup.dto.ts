import { IsString, IsBoolean, IsNotEmpty, IsArray } from 'class-validator';
import { UserLoginDto } from './user.login.dto';
import { user_profile } from '../user.schema';

export class UserSignupDto extends UserLoginDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	phone_number: string;

	@IsBoolean()
	@IsNotEmpty()
	allow_notification: boolean;

	@IsArray()
	follower: [user_profile];

	@IsArray()
	following: [user_profile];

	@IsBoolean()
	enterpriser: boolean;

	@IsString()
	brand: string;

	@IsString()
	profile: string;

	@IsString()
	introduce: string;

	@IsArray()
	scrap: Array<string>;

	@IsArray()
	notification: Array<object>;
}
