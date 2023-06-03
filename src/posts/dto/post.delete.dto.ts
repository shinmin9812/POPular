import { IsString, IsNotEmpty } from 'class-validator';

export class PostDeleteDto {
	@IsString()
	@IsNotEmpty()
	id: string;
}
