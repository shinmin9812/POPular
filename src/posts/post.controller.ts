import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Param,
	Body,
	NotFoundException,
	UseInterceptors,
	UploadedFiles,
} from '@nestjs/common';
import { PostsService } from './post.service';
import { PostCreateDto } from './dto/post.create.dto';
import { PostUpdateDto } from './dto/post.update.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { multerConfig } from 'src/multer.config';
import { MulterModule } from '@nestjs/platform-express/multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Controller('/posts')
@ApiTags('Post')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@ApiOperation({ summary: '모든 게시글 찾기' })
	@Get()
	async getAllPosts() {
		return await this.postsService.getAllPosts();
	}

	@ApiOperation({ summary: '모집게시판 게시글 찾기' })
	@Get('gather')
	async getAllGatherPosts() {
		return await this.postsService.getAllGatherPosts();
	}

	@ApiOperation({ summary: '후기게시판 게시글 찾기' })
	@Get('review')
	async getAllReviewPosts() {
		return await this.postsService.getAllReviewPosts();
	}

	@ApiOperation({ summary: '자유게시판 게시글 찾기' })
	@Get('free')
	async getAllFreePosts() {
		return await this.postsService.getAllFreePosts();
	}

	@ApiOperation({ summary: 'ID로 게시글 찾기' })
	@Get(':id')
	async getPostById(@Param('id') id: string) {
		return await this.postsService.getPostById(id);
	}

	@ApiOperation({ summary: '게시글 등록하기' })
	@Post()
	@UseInterceptors(
		FileFieldsInterceptor(
			[{ name: 'images', maxCount: 5 }],
			multerConfig.storage,
		),
	)
	async createPost(@Body() createDto: PostCreateDto, @UploadedFiles() files) {
		createDto.images = files.map((file: Express.Multer.File) => file.path);
		return await this.postsService.createPost(createDto);
	}

	@ApiOperation({ summary: '게시글 수정하기' })
	@Patch(':id')
	async updatePost(@Param('id') id: string, @Body() updateDto: PostUpdateDto) {
		return await this.postsService.updatePost(id, updateDto);
	}

	@ApiOperation({ summary: '게시글 조회수 증가하기' })
	@Patch(':id/views')
	async incrementViewCount(@Param('id') id: string) {
		const updatedPost = await this.postsService.incrementViewCount(id);

		if (!updatedPost) {
			throw new NotFoundException(
				`'${id}' 아이디를 가진 게시물을 찾지 못했습니다.`,
			);
		}

		return updatedPost;
	}

	@ApiOperation({ summary: '게시글 삭제하기' })
	@Delete(':id')
	async deletePost(@Param('id') id: string) {
		await this.postsService.deletePost(id);
		return { message: '글이 삭제되었습니다.' };
	}
}
