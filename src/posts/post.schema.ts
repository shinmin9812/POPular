import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Post',
};

@Schema(options)
export class Post extends Document {
	@Prop({ required: true })
	title: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
