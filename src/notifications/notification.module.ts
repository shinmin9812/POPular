import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.schema';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';
import { CommentsModule } from 'src/comments/comment.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Notification.name, schema: NotificationSchema },
		]),
		forwardRef(() => CommentsModule),
	],
	controllers: [NotificationsController],
	providers: [NotificationsService],
	exports: [NotificationsService],
})
export class NotificationsModule {}
