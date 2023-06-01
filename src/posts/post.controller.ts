import {} from '@nestjs/common';
import { PostRequestDto } from './dto/post.create.dto';

@Controller('/posts')
export class PostControlller {
	constructor(private readonly postsService: PostsService) {}
}
