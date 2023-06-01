import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'User',
};

@Schema(options)
export class User extends Document {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	pw: string;

	@Prop({ required: true })
	nickname: string;

	@Prop({ required: true })
	phoneNumber: string;

	@Prop({ type: Array, required: true })
	follower: {
		id: string;
		nickname: string;
		profile: string;
	};

	@Prop({ type: Array, required: true })
	following: {
		id: string;
		nickname: string;
	};

	@Prop({ required: true })
	isEnterpriser: boolean;

	@Prop({ required: true })
	brand: string;

	@Prop({ required: true })
	profile: string;

	@Prop({ required: true })
	allowNotification: boolean;

	@Prop({ required: true })
	notifications: [Notification];
}

export const UserSchema = SchemaFactory.createForClass(User);
