import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { Store, StoreSchema } from 'src/stores/store.schema';
import { CommentsModule } from 'src/comments/comment.module';
import { NotificationsModule } from 'src/notifications/notification.module';
import { Feed, FeedSchema } from 'src/feeds/feed.schema';
import { Comment, CommentSchema } from 'src/comments/comment.schema';
import { FeedsModule } from 'src/feeds/feed.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
		MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }]),
		MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
		forwardRef(() => CommentsModule),
		forwardRef(() => NotificationsModule),
		forwardRef(() => FeedsModule)
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule { }
