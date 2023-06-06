import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { NotificationsService } from './notification.service';
import { NotificationCreateDto } from './dto/notification.create.dto';
import { NotificationUpdateDto } from './dto/notification.update.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/notifications')
@ApiTags('Notification')
export class NotificationsController {
	constructor(private readonly notificationService: NotificationsService) {}

	@ApiOperation({ summary: '모든 알림 조회' })
	@Get()
	async getNotifications() {
		return await this.notificationService.getNotifications();
	}

	@ApiOperation({ summary: '유저별 알림 조회' })
	@Get('/user/:userId')
	async getUserNotifications(@Param('userId') id: string) {
		return await this.notificationService.getNotifications(id);
	}

	@ApiOperation({ summary: 'ID로 알림 조회' })
	@Get('/:id')
	async getNotificationsById(@Param('id') id: string) {
		return await this.notificationService.getNotificationById(id);
	}

	@ApiOperation({ summary: '알림 등록하기' })
	@Post()
	async createNotification(@Body() createDto: NotificationCreateDto) {
		return await this.notificationService.createNotification(createDto);
	}

	@ApiOperation({ summary: '알림 수정하기' })
	@Patch(':id')
	async updateNotification(
		@Param('id') id: string,
		@Body() updateDto: NotificationUpdateDto,
	) {
		return await this.notificationService.updateNotification(id, updateDto);
	}

	@ApiOperation({ summary: '알림 삭제하기' })
	@Delete(':id')
	async deleteNotification(@Param('id') id: string) {
		await this.notificationService.deleteNotification(id);
		return { message: '알림이 삭제되었습니다.' };
	}
}
