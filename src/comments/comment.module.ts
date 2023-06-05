import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./comment.schema";
import { CommentsController } from "./comment.controller";
import { CommentsService } from "./comment.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema}]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}