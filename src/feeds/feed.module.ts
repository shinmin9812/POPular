import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedSchema } from './feed.schema';
import { FeedsController } from './feed.controller';
import { FeedsService } from './feed.service';


@Module({
	imports: [
		MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }]),
	],
	controllers: [FeedsController],
	providers: [FeedsService],
})
export class FeedsModule {}
