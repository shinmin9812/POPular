import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.schema';
import { StoreRequestDto } from './dto/store.request.dto';

@Injectable()
export class StoreService {
	constructor(
		@InjectModel(Store.name) private readonly storeModel: Model<Store>,
	) {}

	async getAllStores(): Promise<Store[]> {
		return await this.storeModel.find();
	}

	async getPaginate(page: number): Promise<Store[]> {
		const limit = 20;
		const offset = (page - 1) * limit;

		return await this.storeModel.find().limit(limit).skip(offset);
	}

	async getStoreById(_id: string): Promise<Store> {
		return await this.storeModel.findById(_id);
	}

	async getStoresByDate(startDate: Date, endDate: Date): Promise<Store[]> {
		return await this.storeModel.find({
			start_date: { $gte: startDate },
			end_date: { $lte: endDate },
		});
	}

	async getStoresByCoord(
		lng: Number,
		lat: Number,
		distance: Number,
	): Promise<Store[]> {
		return await this.storeModel.find({
			coord: {
				$nearSphere: {
					$geometry: {
						type: 'Point',
						coordinates: [lng, lat],
					},
					$maxDistance: distance,
				},
			},
		});
	}

	async createStore(body: StoreRequestDto): Promise<Store> {
		const lng = body.coord.coordinates[0];
		const lat = body.coord.coordinates[1];

		const newStore = {
			...body,
			coord: {
				type: 'Point',
				coordinates: [lng, lat],
			},
		};

		return await this.storeModel.create(newStore);
	}

	async updateStore(_id: string, body: StoreRequestDto): Promise<Store> {
		return await this.storeModel.findByIdAndUpdate({ _id }, body, {
			new: true,
		});
	}

	async deleteStore(_id: string): Promise<Store> {
		return await this.storeModel.findByIdAndDelete(_id);
	}
}
