import { Body, Controller, Delete, Get, NotAcceptableException, Param, Post, Put, Query,  UploadedFile,UseInterceptors } from '@nestjs/common';
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentService } from './content.service';
import { query } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller("content")
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

  @Post('addcontent')
  @UseInterceptors(FileInterceptor('ImageFiles'))
  async create(@UploadedFile() file : Array<Express.Multer.File>,@Body() createContent: CreateContent) {
    console.log(file);
    console.log(createContent);
    
    try {

      return await this.contentService.create(createContent,file);

    } catch (error) {
      return `Have error : ${error}`;
    }
  }
  @Put('editcontent')
  async edit(@Query('id') id:string,@Body()  createContent: CreateContent) {
    try {
      return await this.contentService.updateContent(id,createContent);

    } catch (error) {
      return `Have error : ${error}`;
    }
  }

  @Delete('deletecontent')
  async delete(@Query('id') id:string) {
    try {
      return await this.contentService.removeById(id);

    } catch (error) {
      return `Have error : ${error}`;
    }
  }
}
