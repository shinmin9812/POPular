import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotificationCreateDto } from "./dto/notification.create.dto";
import { NotificationUpdateDto } from "./dto/notification.update.dto";
import { Notification } from 'src/notifications/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
  ) {}

  async getNotifications(userId?: string): Promise<Notification[]> {
    try {
      let query = this.notificationModel.find();

      if (userId) {
        query = query.where('userId', userId);
      }

      const notifications = await query
        .populate('content')
        .exec();

      return notifications;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException("알림 불러오기를 실패했습니다.")
    }
  }

  async getNotificationById(id: string): Promise<Notification> {
    try {
      const notification = await this.notificationModel.findById(id)
        .populate('content')
        .exec();

      if (!notification) {
        throw new NotFoundException(`'${id}' 아이디를 가진 알림을 찾지 못했습니다.`);
      }

      return notification;
    } catch (err) {
      throw new NotFoundException(`'${id}' 아이디를 가진 알림을 찾지 못했습니다.`);
    }
  }

  async createNotification(notificationCreateDto: NotificationCreateDto): Promise<Notification> {
    try {
      const createdNotification = new this.notificationModel(notificationCreateDto);
      return await createdNotification.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException("잘못된 데이터를 입력하셨습니다.");
      }
			console.error(err);
      throw new InternalServerErrorException("알림 생성에 실패하였습니다.");
    }
  }

  async updateNotification(id: string, notificationUpdateDto: NotificationUpdateDto): Promise<Notification> {
    try {
      const notification = await this.notificationModel.findById(id).exec();

      if (!notification) {
        throw new NotFoundException(`'${id}' 아이디를 가진 알림을 찾지 못했습니다.`);
      }

      Object.assign(notification, notificationUpdateDto);

      return await notification.save();
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException("잘못된 데이터를 입력하셨습니다.");
      }

      throw new InternalServerErrorException("알림 업데이트에 실패하였습니다.");
    }
  }

  async deleteNotification(id: string): Promise<void> {
    try {
      const deletedNotification = await this.notificationModel.findByIdAndRemove(id).exec();

      if (!deletedNotification) {
        throw new NotFoundException(`'${id}' 아이디를 가진 알림을 찾지 못했습니다.`);
      }

    } catch (err) {
      throw new InternalServerErrorException('알림 삭제에 실패하였습니다.');
    }
  }
}