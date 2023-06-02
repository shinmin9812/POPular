import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
} from '@nestjs/common';
import { StoreRequestDto } from './dto/store.request.dto';
import { StoreService } from './store.service';

@Controller('/stores')
export class StoreController {
	constructor(private readonly storeServcie: StoreService) {}

	@Get()
	async getAllStore() {
		return await this.storeServcie.getAllStores();
	}

	@Get(':id')
	async getStoreById(@Param('id') _id: string) {
		return await this.storeServcie.getStoreById(_id);
	}

	@Post()
	async create(@Body() body: StoreRequestDto) {
		return await this.storeServcie.createStore(body);
	}

	@Put(':id')
	async update(@Param('id') _id: string, @Body() body: StoreRequestDto) {
		return await this.storeServcie.updateStore(_id, body);
	}

	@Patch('/:id/scrap/:scrap')
	async updateScrap(
		@Param('id') _id: string,
		@Param('scrap') updateScrap: number,
	) {
		return await this.storeServcie.updateScrap(_id, updateScrap);
	}

	@Delete(':id')
	async delete(@Param('id') _id: string) {
		return await this.storeServcie.deleteStore(_id);
	}
}
