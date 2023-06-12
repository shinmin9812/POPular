import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { Store, StoreSchema } from 'src/stores/store.schema';
import { CommentsModule } from 'src/comments/comment.module';
import { NotificationsModule } from 'src/notifications/notification.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
		forwardRef(() => CommentsModule),
		forwardRef(() => NotificationsModule)
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
