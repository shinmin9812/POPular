import { IsString, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
	@IsString()
	@IsNotEmpty()
	profile: string;

	@IsString()
	@IsNotEmpty()
	introduce: string;

	@IsString()
	@IsNotEmpty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	pw: string;

	@IsString()
	@IsNotEmpty()
	phoneNumber: string;
}
