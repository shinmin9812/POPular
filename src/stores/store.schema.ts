import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

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
	linkType: string;
	linkTitle: string;
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

	@Prop({ type: Object, required: true })
	coord: coordinfo;

	@Prop({ required: true, default: 0 })
	price: number;

	@Prop({ type: Array })
	sns: [snsinfo];

	@Prop({ default: false })
	reservation_required: boolean;

	@Prop()
	images: Array<string>;

	@Prop({ default: 0 })
	scrap: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
