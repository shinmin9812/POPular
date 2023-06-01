import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Notification',
};

@Schema(options)
export class Notification extends Document {
	@Prop({ required: true })
	type: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
