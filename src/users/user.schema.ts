import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Schema as MongooseSchema } from 'mongoose';


const options: SchemaOptions = {
	timestamps: true,
	collection: 'User',
};

export class user_profile {
	id: string;
	nickname: string;
	profile: string;
}

@Schema(options)
export class User extends Document {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	pw: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	nickname: string;

	@Prop({ required: true })
	phone_number: string;

	@Prop({ type: Array<user_profile>, default: [] })
	follower: [user_profile];

	@Prop({ type: Array<user_profile>, default: [] })
	following: [user_profile];

	@Prop({ default: false })
	enterpriser: boolean;

	@Prop({ default: "" })
	brand: string;

	@Prop({ default: "" })
	profile: string;

	@Prop({ default: '한 줄 소개를 넣어주세요!' })
	introduce: string;

	@Prop({ required: true })
	allow_notification: boolean;

	@Prop({ default: [] })
	scrap: Array<string>;

	@Prop({ type: Array<object>, default: [] })
	notifications: [Notification];
}

export const UserSchema = SchemaFactory.createForClass(User);
