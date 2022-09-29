import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentDataSchema } from './ContentData/contentData.schema';
import { UploadModule } from 'src/Upload/upload.module';
import { SearchService } from './search.service';
import { CommentSchema } from './Comment/comment.schama';
import { CommentService } from './Comment/comment.service';
import { CommentController } from './Comment/comment.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'contentData', schema: ContentDataSchema },
      { name: 'comment', schema: CommentSchema },
    ]),
    UploadModule,
  ],
  controllers: [ContentController,CommentController],
  providers: [ContentService, SearchService, CommentService],
  exports: [ContentService, SearchService, CommentService],
})
export class ContentModule {}
