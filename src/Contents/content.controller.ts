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
import { SearchService } from './search.service';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly searchService: SearchService,
  ) {}

  @Get()
  getAll() {
    return this.contentService.findAll();
  }

  @Get('getContentBySearch')
  getBySearch(@Query('search') word: string) {
    return this.searchService.searchContent(word);
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
    let contentCreated = await this.contentService.create(createContent, file);
    if (contentCreated != null) {
      return `Save new content successful : ${contentCreated.id}`;
    }
    return `Have some error`;
  }
  @Put('editcontent')
  @UseInterceptors(FilesInterceptor('ImageFiles'))
  async edit(
    @Query('id') id: string,
    @Body() createContent: CreateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    let contentUpdated = await this.contentService.updateContent(
      id,
      createContent,
      file,
    );
    if (contentUpdated != null) {
      return `Update content successful : ${contentUpdated[0].id}`;
    }
    return `Have some error`;
  }

  @Delete('deletecontent')
  async delete(@Query('id') id: string) {
    let contentremoved = await this.contentService.removeById(id);
    if (contentremoved != null) {
      return `Update content successful : ${contentremoved[0].id}`;
    }
    return `Have some error`;
  }
}
