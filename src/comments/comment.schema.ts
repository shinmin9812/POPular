import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	Document,
	SchemaOptions,
	Schema as MongooseSchema,
	Types,
} from 'mongoose';
import { Feed } from 'src/feeds/feed.schema';
import { User } from 'src/users/user.schema';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Comment',
};

@Schema(options)
export class Comment extends Document {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	author: Types.ObjectId | User;

	@Prop({ required: true })
	content: string;

	@Prop({ type: Types.ObjectId, refPath: 'type' })
	parent: Types.ObjectId | Feed | Comment;

	@Prop({
		type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }],
		default: [],
	})
	recomments: MongooseSchema.Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
