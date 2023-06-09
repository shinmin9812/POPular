import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedSchema } from './feed.schema';
import { FeedsController } from './feed.controller';
import { FeedsService } from './feed.service';
import { CommentsModule } from 'src/comments/comment.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }]),
		forwardRef(() => CommentsModule),
	],
	exports: [FeedsService],
	controllers: [FeedsController],
	providers: [FeedsService],
})
export class FeedsModule {}
