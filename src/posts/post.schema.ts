import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Comment, CommentSchema } from 'src/comments/comment.schema';
import { Store, StoreSchema } from 'src/stores/store.schema';

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

	@Prop({ required: true })
	images?: Array<string>;

	@Prop({ type: Store })
	storeId?: string;

	@Prop({ required: true, min: 1, max: 5 })
	ratings?: number;

	@Prop({ required: true })
	likes: Array<string>;

	@Prop({ required: true })
	reports: Array<string>;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Types.ObjectId[] | Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
