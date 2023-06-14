import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';
import { FeedsModule } from 'src/feeds/feed.module';
import { UserModule } from 'src/users/user.module';
import { NotificationsModule } from 'src/notifications/notification.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
		forwardRef(() => FeedsModule),
		forwardRef(() => UserModule),
		forwardRef(() => NotificationsModule),
	],
	controllers: [CommentsController],
	providers: [CommentsService],
	exports: [CommentsService],
})
export class CommentsModule {}
