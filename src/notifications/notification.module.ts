import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './notification.schema';
import { NotificationsController } from './notification.controller';
import { NotificationsService } from './notification.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Notification.name, schema: NotificationSchema },
		]),
	],
	controllers: [NotificationsController],
	providers: [NotificationsService],
})
export class NotificationsModule {}
