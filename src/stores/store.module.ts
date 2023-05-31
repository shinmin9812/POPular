import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresController } from './store.controller';
import { StoresService } from './store.service';
import { Store, StoreSchema } from './store.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
	],
	controllers: [StoresController],
	providers: [StoresService],
})
export class StoresModule {}
