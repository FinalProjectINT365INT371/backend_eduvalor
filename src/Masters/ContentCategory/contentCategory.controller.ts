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
  } from '@nestjs/common';
  import { CreateContentCategory} from './dto/category.dto';
  import { ContentCategoryService } from './contentCategory.service';
  
  @Controller('contentCategory')
  export class ContentCategoryController {
    constructor(private readonly contentCategoryService: ContentCategoryService) {}
  
    @Get()
    getAll() {
      return this.contentCategoryService.findAll();
    }
  
    @Get('getbyId')
    async getById(@Query('id') id: string) {
      return await this.contentCategoryService.findById(id);
    }
  
    @Post('add')
    async create(@Body() createContentCategory: CreateContentCategory) {
      return await this.contentCategoryService.create(createContentCategory);
    }
  
    @Put('update')
    async update(
      @Query('id') id: string,
      @Body() updateContentCategory: CreateContentCategory,
    ) {
      return await this.contentCategoryService.update(id, updateContentCategory);
    }
  
    @Delete('delete')
    async removeById(@Query('id') id: string) {
      return this.contentCategoryService.removeById(id);
    }
  }
  