import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
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

	@Prop({ required: true })
	author: User;

	@Prop({ required: true, enum: BoardType })
	board: BoardType;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	images?: Array<string>;

	@Prop({ required: true })
	storeId?: string;

	@Prop({ required: true })
	rating?: string;

	@Prop({ required: true })
	likes: number;

	@Prop({ required: true })
	report: number;

	@Prop({ required: true })
	comments: Comment[];

}

export const PostSchema = SchemaFactory.createForClass(Post);
