import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Body,
	Patch,
	UseGuards,
} from '@nestjs/common';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

type checknickname = {
	nickname: string;
};

type checkemail = {
	email: string;
};

@Controller('/users')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: '모든 유저 정보 찾기' })
	@Get()
	async getAllUsers(): Promise<User[]> {
		return await this.userService.getAllUsers();
	}

	@ApiOperation({ summary: 'ID로 유저 정보 찾기' })
	@Get(':id')
	async getUserById(@Param('id') _id: string): Promise<User> {
		return await this.userService.getUserById(_id);
	}

	@ApiOperation({ summary: '유저 닉네임 중복 여부 확인하기' })
	@Post('/checknickname')
	async checkNickname(@Body() body: checknickname): Promise<string> {
		return await this.userService.checkDuplicateNickname(body.nickname);
	}

	@ApiOperation({ summary: '유저 이메일 중복 여부 확인하기' })
	@Post('/checkemail')
	async checkEmail(@Body() body: checkemail): Promise<string> {
		return await this.userService.checkDuplicateEmail(body.email);
	}

	@ApiOperation({ summary: '유저 정보 등록하기' })
	@Post()
	async createUser(@Body() body: UserSignupDto): Promise<User> {
		return await this.userService.createUser(body);
	}

	@ApiOperation({ summary: '유저 정보 수정하기(token 필요)' })
	@Patch(':id')
	@UseGuards(AuthGuard)
	async updateUser(
		@Param('id') _id: string,
		@Body() body: UserUpdateDto,
	): Promise<User> {
		return await this.userService.updateUser(_id, body);
	}

	@ApiOperation({ summary: '유저 스크랩 & 스토어 스크랩 등록하기' })
	@Patch(':userId/scrapStore/:storeId')
	async updateScrap(
		@Param('userId') userId: string,
		@Param('storeId') storeId: string,
	): Promise<any> {
		return await this.userService.updateScrap(userId, storeId);
	}

	@ApiOperation({ summary: '유저 스크랩 & 스토어 스크랩 취소하기' })
	@Patch(':userId/unscrapStore/:storeId')
	async updateUnScrap(
		@Param('userId') userId: string,
		@Param('storeId') storeId: string,
	): Promise<any> {
		return await this.userService.updateUnscrap(userId, storeId);
	}

	@ApiOperation({ summary: '유저 정보 삭제하기' })
	@Delete(':id')
	async deleteUser(@Param('id') _id: string): Promise<User> {
		return await this.userService.deleteUser(_id);
	}
}
