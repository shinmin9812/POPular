import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
	Document,
	SchemaOptions,
	Schema as MongooseSchema,
	Types,
} from 'mongoose';
import { User } from 'src/users/user.schema';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Comment',
};

class parentinfo {
	@Prop({ type: String, required: true })
	type: string;

	@Prop({ type: Types.ObjectId, ref: 'Feed | Comment', required: true })
	id: Types.ObjectId;
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
		type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }],
		default: [],
	})
	recomments: MongooseSchema.Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
