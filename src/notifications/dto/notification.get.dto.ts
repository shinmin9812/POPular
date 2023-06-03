import { User } from 'src/users/user.schema';
import { Store } from 'src/stores/store.schema';
import { Comment } from 'src/comments/comment.schema';
import { ContentModel, NotificationType } from '../notification.schema';
import { BoardType } from 'src/posts/post.schema';

export class NotificationGetDto {
  type: NotificationType;
  board?: BoardType;
  userId: string | User;
  content: string | User | Store | Comment;
  contentModel: ContentModel;
  checked: boolean;
}
