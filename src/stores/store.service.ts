import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.schema';
import { StoreRequestDto } from './dto/store.request.dto';
import { Page } from '../page/page';
@Injectable()
export class StoreService {
	constructor(
		@InjectModel(Store.name) private readonly storeModel: Model<Store>,
	) {}

	async getAllStores(page: StoreRequestDto): Promise<Page<Store>> {
		const total = await this.storeModel.count();
		const stores = await this.storeModel.find({
			take: page.getLimit(),
			skip: page.getOffset(),
		});

		return new Page(total, page.pageSize, stores);
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
