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

export enum ParentType {
	FEED = 'Feed',
	COMMENT = 'Comment',
}

export class parentinfo {
	@Prop({ type: String, required: true })
	type: ParentType;

	@Prop({ type: Types.ObjectId, refPath: 'type', required: true })
	id: Types.ObjectId | Feed | Comment;
}

@Schema(options)
export class Comment extends Document {
	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	author: Types.ObjectId | User;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	parent: parentinfo;

	@Prop({
		type: [{ type: Types.ObjectId, ref: 'Comment' }],
		default: [],
	})
	recomments: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
