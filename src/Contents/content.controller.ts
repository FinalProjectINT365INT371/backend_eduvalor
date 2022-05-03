import { Body, Controller, Get, NotAcceptableException, Param, Post } from '@nestjs/common';
import {  CreateContent } from './ContentData/dto/contentData.dto';
import { ContentService } from './content.service';

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getAll() {
    return this.contentService.findAll();
  }

  @Get()
  getById(@Param() id:string) {
    return this.contentService.findById(id);
  }

  @Post('addcontent')
  async create(@Body()  createContent: CreateContent) {
    try {

      await this.contentService.create(createContent);

    } catch (error) {
      return `Have error : ${error}`;
    }
  }
}
