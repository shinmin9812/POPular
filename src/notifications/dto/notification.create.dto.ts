import { IsEnum, IsMongoId, IsNotEmpty, ValidateIf } from "class-validator";
import { ContentModel, NotificationType } from "../notification.schema";
import { BoardType } from "src/posts/post.schema";
import { Types } from "mongoose";

export class NotificationCreateDto {
  @IsEnum(NotificationType)
  @IsNotEmpty()
  readonly type: NotificationType;

  @IsEnum(BoardType)
  @ValidateIf(obj => obj.type === NotificationType.Comment)
  readonly board: BoardType;

  @IsNotEmpty()
  @IsMongoId()
  readonly userId: Types.ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  readonly content: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(ContentModel)
  readonly contentModel: ContentModel;
}