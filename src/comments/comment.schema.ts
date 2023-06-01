import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Comment',
};

@Schema(options)
export class Comment extends Document {
	//작성자 ID로 다시 가져와야 함
	@Prop({ required: true })
	author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
