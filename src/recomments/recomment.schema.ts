import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Schema as MongooseSchema } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Comment',
};

@Schema(options)
export class Recomment extends Document {
	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
	author: MongooseSchema.Types.ObjectId;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	isDeleted: boolean;
}

export const RecommentSchema = SchemaFactory.createForClass(Recomment);
