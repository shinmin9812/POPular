import { Injectable } from '@nestjs/common';
import { UserSignupDto } from '../dto/user.signup.dto';
import { UserService } from '../user.service';
import { UserLoginDto } from '../dto/user.login.dto';

@Injectable()
export class AuthService {
	constructor(private userService: UserService) {}

	async login(body: UserLoginDto) {}
}
