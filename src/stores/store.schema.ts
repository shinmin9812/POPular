import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Schema as MongooseSchema } from 'mongoose';

const options: SchemaOptions = {
	timestamps: true,
	collection: 'Store',
};

@Schema(options)
export class Store extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	brand: string;

	@Prop({ required: true })
	startDate: string;

	@Prop({ required: true })
	endDate: string;

	@Prop({ type: Object, required: true })
	hours: {
		mon: {
			start: string | null;
			end: string | null;
		};
		tue: {
			start: string | null;
			end: string | null;
		};
		wed: {
			start: string | null;
			end: string | null;
		};
		thu: {
			start: string | null;
			end: string | null;
		};
		fri: {
			start: string | null;
			end: string | null;
		};
	};

	@Prop({ required: true })
	location: string;

	@Prop({ type: Object, required: true })
	coord: {
		lat: string;
		lng: string;
	};

	@Prop({ required: true })
	price: number | null;

	@Prop()
	sns: [
		{
			linkType: string;
			linkTitle: string;
			link: string;
		},
	];

	@Prop({ default: false })
	reservationRequired: boolean;

	@Prop()
	images: Array<string>;

	@Prop({ default: 0 })
	scrap: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
