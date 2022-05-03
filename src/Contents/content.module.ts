import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentDataSchema } from './ContentData/contentData.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'contentData', schema: ContentDataSchema }])],   
  controllers: [ContentController],
  providers: [ ContentService],
  exports : [ ContentService]
})
export class ContentModule {}
