import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	pw: string;
}
