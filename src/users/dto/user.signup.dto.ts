import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { UserLoginDto } from './user.login.dto';

export class UserSignupDto extends UserLoginDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	nickname: string;

	@IsString()
	@IsNotEmpty()
	phoneNumber: string;

	@IsBoolean()
	@IsNotEmpty()
	allowNotification: boolean;
}
