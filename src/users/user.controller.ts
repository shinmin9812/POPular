import {
	Controller,
	Get,
	Post,
	Delete,
	Param,
	Body,
	Patch,
} from '@nestjs/common';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAllUsers(): Promise<User[]> {
		return await this.userService.getAllUsers();
	}

	@Get(':id')
	async getUserById(@Param('id') _id: string): Promise<User> {
		return await this.userService.getUserById(_id);
	}

	@Post()
	async createUser(@Body() body: UserSignupDto): Promise<User> {
		return await this.userService.createUser(body);
	}

	@Patch(':id')
	async updateUser(
		@Param('id') _id: string,
		@Body() body: UserUpdateDto,
	): Promise<User> {
		return await this.userService.updateUser(_id, body);
	}

	@Delete(':id')
	async deleteUser(@Param('id') _id: string): Promise<User> {
		return await this.userService.deleteUser(_id);
	}
}
