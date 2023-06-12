import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { Store } from './store.schema';
import { StoreRequestDto } from './dto/store.request.dto';
import { handleImages } from 'src/utils/handle.images.util';

@Injectable()
export class StoreService {
	constructor(
		@InjectModel(Store.name) private readonly storeModel: PaginateModel<Store>,
	) {}

	async getAllStores(): Promise<Store[]> {
		return await this.storeModel.find();
	}

	async getPaginate(page: number): Promise<PaginateResult<Store>> {
		return await this.storeModel.paginate(
			{},
			{
				sort: { createdAt: -1 },
				page: page,
				limit: 20,
			},
		);
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

	async getStoresByCategory(category: string): Promise<Store[]> {
		return await this.storeModel.find({
			category: category,
		});
	}

	async createStore(body: StoreRequestDto): Promise<Store> {
		const base64Images = body.images;
		const imageMapping = await handleImages(base64Images);

		const lng = body.coord.coordinates[0];
		const lat = body.coord.coordinates[1];

		const newStore = {
			...body,
			images: Object.values(imageMapping),
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

	async deleteStores(ids: string[]): Promise<void> {
		await this.storeModel.deleteMany({ _id: { $in: ids } });
	}
}
