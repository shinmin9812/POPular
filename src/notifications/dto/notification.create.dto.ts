import { IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ContentModel, NotificationType } from "../notification.schema";
import { BoardType } from "src/posts/post.schema";

export class NotificationCreateDto {
  @IsEnum(NotificationType)
  @IsNotEmpty()
  readonly type: NotificationType;

  @IsOptional()
  @IsEnum(BoardType)
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