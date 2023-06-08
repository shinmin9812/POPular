import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Comment } from 'src/comments/comment.schema';
import { Store } from 'src/stores/store.schema';
import { BoardType } from 'src/feeds/feed.schema';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Notification',
};

export enum NotificationType {
	Follow = 'Follow',
	Comment = 'Comment',
	Recomment = 'Comment',
	Ad = 'Store',
}

@Schema(options)
export class Notification extends Document {
	@Prop({ type: String, required: true, enum: Object.values(NotificationType) })
	type: NotificationType;

	@Prop()
	board?: BoardType;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	user_id: Types.ObjectId | User;

	@Prop({ type: Types.ObjectId, refPath: 'type', required: true })
	content: Types.ObjectId | User | Comment | Store;

	@Prop({ default: false })
	checked: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
