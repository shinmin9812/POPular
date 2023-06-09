import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { FeedsModule } from 'src/feeds/feed.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
		forwardRef(()=> FeedsModule)
	],
	controllers: [CommentsController],
	providers: [CommentsService],
})
export class CommentsModule {}
