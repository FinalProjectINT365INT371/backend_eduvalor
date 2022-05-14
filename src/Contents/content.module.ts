import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentDataSchema } from './ContentData/contentData.schema';
import { UploadModule } from 'src/Upload/upload.module';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'contentData', schema: ContentDataSchema }]), UploadModule],   
  controllers: [ContentController],
  providers: [ ContentService],
  exports : [ ContentService]
})
export class ContentModule {}
