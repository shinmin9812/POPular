import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { ContentModel, NotificationType } from "../notification.schema";
import { BoardType } from "src/posts/post.schema";

export class NotificationCreateDto {
  @IsEnum(NotificationType)
  @IsNotEmpty()
  readonly type: NotificationType;

  @IsEnum(BoardType)
  @ValidateIf(obj => obj.type === NotificationType.Comment)
  readonly board: BoardType;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly content: string;

  @IsNotEmpty()
  @IsEnum(ContentModel)
  readonly contentModel: ContentModel;
}