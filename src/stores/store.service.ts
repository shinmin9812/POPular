import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './store.schema';
import { StoreRequestDto } from './dto/store.request.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    ) { }

    async getAllStores() {
        try {
            const result = await this.storeModel.find();
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async getStoreById(_id: string) {
        return await this.storeModel.findOne({ _id });
    }

    async createStore(body: StoreRequestDto) {
        try {
            const {
                title,
                description,
                brand,
                startDate,
                endDate,
                hours,
                location,
                coord,
                price,
                sns,
                reservationRequired,
                images,
            } = body;
            const store = await this.storeModel.create({
                title,
                description,
                brand,
                startDate,
                endDate,
                hours,
                location,
                coord,
                price,
                sns,
                reservationRequired,
                images,
            });

            return store;
        } catch (err) {
            console.log(err);
        }
    }

    async updateStore(_id: string, body: StoreRequestDto) {
        try {
            const {
                title,
                description,
                brand,
                startDate,
                endDate,
                hours,
                location,
                coord,
                price,
                sns,
                reservationRequired,
                images,
                scrap
            } = body;
            const result = await this.storeModel.findOneAndUpdate({ _id }, {
                title,
                description,
                brand,
                startDate,
                endDate,
                hours,
                location,
                coord,
                price,
                sns,
                reservationRequired,
                images,
                scrap
            }, {
                new: true
            });
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async updateScrap(_id: string, updateScrap: number) {
        try {
            const result = await this.storeModel.findOneAndUpdate({ _id }, { scrap: updateScrap });
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteStore(_id: string) {
        try {
            const result = await this.storeModel.findByIdAndDelete(_id);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
}
