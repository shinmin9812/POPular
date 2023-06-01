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
import { StoresService } from './store.service';

@Controller('/stores')
export class StoresController {
	constructor(private readonly storesServcie: StoresService) {}

	@Get()
	async getAllStore() {
		return await this.storesServcie.getAllStores();
	}

	@Get(':id')
	async getStoreById(@Param('id') _id: string) {
		return await this.storesServcie.getStoreById(_id);
	}
	@Post()
	async create(@Body() body: StoreRequestDto) {
		return await this.storesServcie.createStore(body);
	}

	@Put(':id')
	async update(@Param('id') _id: string, @Body() body: StoreRequestDto) {
		return await this.storesServcie.updateStore(_id, body);
	}

	@Patch('scrap/:id/:scrap')
	async updateScrap(
		@Param('id') _id: string,
		@Param('scrap') updateScrap: number,
	) {
		return await this.storesServcie.updateScrap(_id, updateScrap);
	}

	@Delete(':id')
	async delete(@Param('id') _id: string) {
		return await this.storesServcie.deleteStore(_id);
	}
}
