import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/hassing.util';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async login(email: string, password: string): Promise<any> {
		const user = await this.userService.getUserByEmail(email);

		if (!comparePasswords(password, user?.pw)) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user._id, username: user.email };
		return {
			accses_token: await this.jwtService.signAsync(payload),
		};
	}
}
