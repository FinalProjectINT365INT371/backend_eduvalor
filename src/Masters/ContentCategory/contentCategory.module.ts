import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentCategoryService } from './contentCategory.service';
import { ContentCategoryController } from './contentCategory.controller';
import { ContentCategorySchema } from './category.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'contentCategory', schema: ContentCategorySchema }])],   
  controllers: [ContentCategoryController],
  providers: [ ContentCategoryService],
  exports : [ ContentCategoryService]
})
export class ContentCategoryModule {}
