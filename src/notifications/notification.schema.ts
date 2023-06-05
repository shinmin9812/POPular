import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Comment } from 'src/comments/comment.schema';
import { Store } from 'src/stores/store.schema';
import { BoardType } from 'src/posts/post.schema';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Notification',
};

export enum NotificationType {
	Follow = 'follow',
	Comment = 'comment',
	Ad = 'ad',
}

export enum ContentModel {
	User = 'User',
	Comment = 'Comment',
	Store = 'Store',
}

@Schema(options)
export class Notification extends Document {
	@Prop({ required: true, enum: NotificationType })
	type: NotificationType;

	@Prop()
	board?: BoardType;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	userId: Types.ObjectId | User;

	@Prop({ type: Types.ObjectId, refPath: 'contentModel', required: true })
	content: Types.ObjectId | User | Comment | Store;

	@Prop({ required: true, enum: ContentModel })
	contentModel: ContentModel;

	@Prop({ default: false })
	checked: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
