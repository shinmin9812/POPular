import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Store',
};

class time {
	start: string | null;
	end: string | null;
}

class day {
	mon: time;
	tue: time;
	wed: time;
	thu: time;
	fri: time;
	sat: time;
	sun: time;
}

class coordinfo {
	lat: string;
	lng: string;
}

class snsinfo {
	link_type: string;
	link_title: string;
	link: string;
}

@Schema(options)
export class Store extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	brand: string;

	@Prop({ required: true })
	start_date: Date;

	@Prop({ required: true })
	end_date: Date;

	@Prop({ type: day, required: true })
	hours: day;

	@Prop({ required: true })
	location: string;

	@Prop({ type: coordinfo, required: true })
	coord: coordinfo;

	@Prop({ required: true, default: 0 })
	price: number;

	@Prop({ type: Array })
	sns: Array<snsinfo>;

	@Prop({ default: false })
	reservation_required: boolean;

	@Prop()
	images: Array<string>;

	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
	scrap: Types.ObjectId[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
