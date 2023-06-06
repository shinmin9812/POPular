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

	async getStoreById(_id: string): Promise<Store> {
		return await this.storeModel.findById({ _id });
	}

	async getStoresByDate(startDate: Date, endDate: Date): Promise<Store[]> {
		return await this.storeModel.find({
			start_date: { $gte: startDate },
			end_date: { $lte: endDate },
		});
	}

	async createStore(body: StoreRequestDto): Promise<Store> {
		return await this.storeModel.create(body);
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
