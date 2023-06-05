import {
	Controller,
	Body,
	Post,
	HttpCode,
	HttpStatus,
	Get,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/users/dto/user.login.dto';
import { AuthGuard } from './auth.guard';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: '유저 로그인 토큰 발급' })
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async logIn(@Body() body: UserLoginDto): Promise<any> {
		const { email, pw } = body;
		return await this.authService.login(email, pw);
	}

	@ApiOperation({ summary: '유저 로그인 토큰 인증' })
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@Get('profile')
	async getProfile(@Request() req) {
		return req.user;
	}
}
