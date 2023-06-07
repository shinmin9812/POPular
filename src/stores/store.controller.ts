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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/stores')
@ApiTags('Store')
export class StoreController {
	constructor(private readonly storeServcie: StoreService) {}

	@ApiOperation({ summary: '모든 스토어 정보 찾기' })
	@Get()
	async getAllStore() {
		return await this.storeServcie.getAllStores();
	}

	@ApiOperation({ summary: 'ID로 스토어 정보 찾기' })
	@Get(':id')
	async getStoreById(@Param('id') _id: string) {
		return await this.storeServcie.getStoreById(_id);
	}

	@ApiOperation({ summary: '스토어 정보 등록하기' })
	@Post()
	async create(@Body() body: StoreRequestDto) {
		return await this.storeServcie.createStore(body);
	}

	@ApiOperation({ summary: '스토어 정보 수정하기' })
	@Put(':id')
	async update(@Param('id') _id: string, @Body() body: StoreRequestDto) {
		return await this.storeServcie.updateStore(_id, body);
	}

	@ApiOperation({ summary: '스토어 정보 삭제하기' })
	@Delete(':id')
	async delete(@Param('id') _id: string) {
		return await this.storeServcie.deleteStore(_id);
	}
}
