import { Body, Controller, Get, NotAcceptableException, Param, Post } from '@nestjs/common';
import {  CreateContent } from './ContentData/dto/contentData.dto';
import { ContentService } from './content.service';

@Controller("userRole")
export class UserRoleController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getAll() {
    return this.contentService.findAll();
  }

  @Get()
  getById(@Param() id:string) {
    return this.contentService.findById(id);
  }

  @Post('adduser')
  async create(@Body()  createContent: CreateContent) {
    try {

      await this.contentService.create(createContent);

    } catch (error) {
      return `Have error : ${error}`;
    }
  }
}
