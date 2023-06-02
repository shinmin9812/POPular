import { IsString, IsNotEmpty } from 'class-validator';

export class PostDeleteDto {
	@IsString()
	@IsNotEmpty()
	_id: string;
}
