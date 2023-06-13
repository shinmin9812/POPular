import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { StoreRequestDto } from './dto/store.request.dto';
import { StoreUpdateDto } from './dto/store.update.dto';
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

	@ApiOperation({ summary: '스토어 페이지네이션 검색' })
	@Get('pages')
	async getPaginate(@Query('page') page: number = 1) {
		return await this.storeServcie.getPaginate(page);
	}

	@ApiOperation({ summary: 'ID로 스토어 정보 찾기' })
	@Get('store/:id')
	async getStoreById(@Param('id') _id: string) {
		return await this.storeServcie.getStoreById(_id);
	}

	@ApiOperation({ summary: '날짜로 스토어 정보 찾기' })
	@Get('date/:start/:end')
	async getStoresByDate(
		@Param('start') startDate: Date,
		@Param('end') endDate: Date,
	) {
		return await this.storeServcie.getStoresByDate(startDate, endDate);
	}

	@ApiOperation({ summary: '좌표 위치 주변 스토어 정보 찾기' })
	@Get('/coord')
	async getStoresByCoord(@Query() query) {
		const { x, y, distance } = query;
		const longtitude = Number(y);
		const latitude = Number(x);
		const searchDistance = Number(distance);

		return await this.storeServcie.getStoresByCoord(
			longtitude,
			latitude,
			searchDistance,
		);
	}

	@ApiOperation({ summary: '스토어 정보 등록하기' })
	@Post()
	async create(@Body() body: StoreRequestDto) {
		return await this.storeServcie.createStore(body);
	}

	@ApiOperation({ summary: '스토어 정보 수정하기' })
	@Patch(':id')
	async update(@Param('id') _id: string, @Body() body: StoreUpdateDto) {
		return await this.storeServcie.updateStore(_id, body);
	}

	@ApiOperation({ summary: '스토어 정보 삭제하기' })
	@Delete()
	async delete(@Body() ids: string[]) {
		return await this.storeServcie.deleteStores(ids);
	}
}
