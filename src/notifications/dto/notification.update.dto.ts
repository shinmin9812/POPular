import { IsBoolean, IsNotEmpty } from "class-validator";

export class NotificationUpdateDto {
  @IsBoolean()
  @IsNotEmpty()
  checked: boolean;
}