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
import { ContentApprovingSchema } from './ContentApproving/contentApproving.schema';
import { ApproveContentController } from './ContentApproving/contentApproving.controller';
import { ContentApprovingService } from './ContentApproving/contentApproving.service';
import { ShareLogSchema } from './Share/share.schema';
import { ShareService } from './Share/share.service';
import { UsersModule } from 'src/Users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'contentData', schema: ContentDataSchema },
      { name: 'comment', schema: CommentSchema },
      { name: 'contentApproving', schema: ContentApprovingSchema },
      { name: 'shareLog', schema: ShareLogSchema },
    ]),
    UploadModule, UsersModule
  ],
  controllers: [ContentController,CommentController,ApproveContentController],
  providers: [ContentService, SearchService, CommentService, ContentApprovingService, ShareService],
  exports: [ContentService, SearchService, CommentService, ContentApprovingService, ShareService],
})
export class ContentModule {}
