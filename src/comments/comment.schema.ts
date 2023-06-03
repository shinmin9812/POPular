import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Schema as MongooseSchema } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Comment',
};

@Schema(options)
export class Comment extends Document {
	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
	author: MongooseSchema.Types.ObjectId;

	@Prop({ required: true })
	content: string;

	@Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }] })
	recomments: MongooseSchema.Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
