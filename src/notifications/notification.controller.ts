import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { NotificationsService } from "./notification.service";
import { NotificationCreateDto } from "./dto/notification.create.dto";
import { NotificationUpdateDto } from "./dto/notification.update.dto";

@Controller('/notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  async getNotifications() {
    return await this.notificationService.getNotifications();
  }

  @Get('/user/:userId')
  async getUserNotifications(@Param('userId') id:string) {
    return await this.notificationService.getNotifications(id);
  }
  
  @Get('/:id')
  async getNotificationsById(@Param('id') id:string) {
    return await this.notificationService.getNotificationById(id);
  }

  @Post()
  async createNotification(@Body() createDto: NotificationCreateDto) {
    return await this.notificationService.createNotification(createDto);
  }

  @Patch(':id')
  async updateNotification(@Param('id') id: string, @Body() updateDto: NotificationUpdateDto) {
    return await this.notificationService.updateNotification(id, updateDto);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id:string) {
    await this.notificationService.deleteNotification(id);
    return { message: '알림이 삭제되었습니다.'};
  }

}