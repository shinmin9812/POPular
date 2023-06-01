import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { User } from 'src/users/user.schema';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Post',
};

export enum BoardType {
	Gather = 'gather',
	Review = 'review',
	Free = 'free',
}

@Schema(options)
export class Post extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ type: User, required: true })
	author: Types.ObjectId | User;

	@Prop({ required: true, enum: BoardType })
	board: BoardType;

	@Prop({ required: true })
	content: string;

	@Prop()
	images?: Array<string>;

	@Prop()
	storeId?: string;

	@Prop()
	ratings?: string;

	@Prop({ required: true, min: 1, max: 5 })
	likes: number;

	@Prop({ required: true })
	reports: Array<string>;

	@Prop()
	comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
