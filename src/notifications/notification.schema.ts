import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Comment } from 'src/comments/comment.schema';
import { Store } from 'src/stores/store.schema';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Notification',
};

@Schema(options)
export class Notification extends Document {
	@Prop({ required: true })
	type: string;

	@Prop({ required: true })
	board: string;

	@Prop({ required: true })
	userId: string;

	@Prop({ type: Types.ObjectId, refPath: 'contentModel', required: true })
	content: Types.ObjectId;

	@Prop({ required: true, enum: ['User', 'Comment', 'Store'] })
	contentModel: string;

	@Prop({ required: true })
	checked: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
