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

	async login(email: string, password: string): Promise<object> {
		const user = await this.userService.getUserByEmail(email);
		if (!user) {
			throw new Error('존재하지 않는 이메일입니다.');
		}
		const isMatch = await comparePasswords(password, user.pw);

		if (isMatch) {
			const payload = { sub: user._id, username: user.email };
			return {
				token: await this.jwtService.signAsync(payload),
			};
		} else {
			throw new Error('비밀번호가 틀렸습니다.');
		}
	}
}
