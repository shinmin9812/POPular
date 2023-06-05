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

	@ApiOperation({ summary: '유저 정보 삭제하기' })
	@Delete(':id')
	async deleteUser(@Param('id') _id: string): Promise<User> {
		return await this.userService.deleteUser(_id);
	}
}
