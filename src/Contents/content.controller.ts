import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentService } from './content.service';
import { query } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getAll() {
    return this.contentService.findAll();
  }

  @Get('getContentByID')
  getById(@Query('id') id: string) {
    return this.contentService.findById(id);
  }

  @Get('getImageContentByName')
  async getImageContentById(@Query('imageName') id: string) {
    return await this.contentService.findImageId(id);
  }

  @Get('getImageInContent')
  async getImageInContent(@Query('ContentId') id: string) {
    return await this.contentService.getImageInContent(id);
  }
  @Post('addcontent')
  @UseInterceptors(FilesInterceptor('ImageFiles'))
  async create(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() createContent: CreateContent,
  ) {
    console.log(file);
    console.log(createContent);
    try {
      return await this.contentService.create(createContent, file);
    } catch (error) {
      return `Have error : ${error}`;
    }
  }
  @Put('editcontent')
  @UseInterceptors(FilesInterceptor('ImageFiles'))
  async edit(
    @Query('id') id: string,
    @Body() createContent: CreateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    try {
      return await this.contentService.updateContent(id, createContent,file);
    } catch (error) {
      return `Have error : ${error}`;
    }
  }

  @Delete('deletecontent')
  async delete(@Query('id') id: string) {
    try {
      return await this.contentService.removeById(id);
    } catch (error) {
      return `Have error : ${error}`;
    }
  }
}
