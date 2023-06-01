import { IsString, IsNotEmpty,} from 'class-validator';

export class PostDeleteDto {
  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  _id:string
}