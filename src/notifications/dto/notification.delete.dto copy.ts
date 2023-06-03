import { IsNotEmpty, IsString } from "class-validator";


export class NotificationDeleteDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}