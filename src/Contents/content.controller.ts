import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  PayloadTooLargeException,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentService } from './content.service';
import { query } from 'express';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { SearchService } from './search.service';
import { ValidationPipe } from '../validation.pipe';
import { UpdateContent } from './ContentData/dto/updateContent.dto';
import { ShareService } from './Share/share.service';
import { CreateShareLog } from './Share/share.dto';
import { UsersProfileService } from 'src/Users/Profile/profile.service';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';
@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly searchService: SearchService,
    private readonly shareService: ShareService,
    private readonly usersProfileService: UsersProfileService,
  ) {}

  //Search Service
  @Get()
  getAll() {
    return this.contentService.findAll();
  }

  @Get('getContentBySearchFromWord')
  getBySearchWord(
    @Query('word') word: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.searchService.searchContentsFromWord(word, page, size);
  }

  @Get('getContentBySearchFromCreator')
  getBySearchCreator(
    @Query('creator') creator: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.searchService.searchContentsFromCreator(creator, page, size);
  }

  @Get('getContentBySearchFromTag')
  getBySearchTag(
    @Query('tag') tag: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.searchService.searchContentsFromTag(tag, page, size);
  }

  @Get('getContentBySearchFromHeader')
  getBySearchHeader(
    @Query('header') header: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.searchService.searchContentsFromHeader(header, page, size);
  }

  @Get('getContentByID')
  async getById(@Query('id') id: string) {
    let content = await this.contentService.findById(id);
    content.View = content.View + 1;
    content.save();
    return content;
  }
  //Search Service

  @Get('getImageContentByName')
  async getImageContentById(@Query('imageName') id: string) {
    return await this.contentService.findImageId(id);
  }

  @Get('getImageInContent')
  async getImageInContent(@Query('ContentId') id: string) {
    return await this.contentService.getImageInContent(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Post('addcontent')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'ImageFiles' },
      { name: 'ImageCover', maxCount: 1 },
    ]),
  )
  async create(
    @Req() req,
    @UploadedFiles()
    files: {
      ImageFiles?: Array<Express.Multer.File>;
      ImageCover?: Array<Express.Multer.File>;
    },
    @Body() createContent: CreateContent,
  ) {
    let contentCreated = await this.contentService.create(
      createContent,
      files.ImageFiles,
      files.ImageCover,
    );
    if (contentCreated != null) {
      console.log(req.user);
      let user = await this.usersProfileService.findById(req.user.user_id);
      user.ContentCreated.push(contentCreated.id);
      user.save();
      return `Save new content successful : ${contentCreated.id}`;
    }
    return `Have some error`;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @UsePipes(ValidationPipe)
  @Put('editcontent')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'ImageFiles' },
      { name: 'ImageCover', maxCount: 1 },
    ]),
  )
  async edit(
    @Query('id') id: string,
    @Body() updateContent: UpdateContent,
    @UploadedFiles()
    files: {
      ImageFiles?: Array<Express.Multer.File>;
      ImageCover?: Array<Express.Multer.File>;
    },
  ) {
    let contentUpdated = await this.contentService.updateContent(
      id,
      updateContent,
      files.ImageFiles,
      files.ImageCover,
    );
    if (contentUpdated != null) {
      return `Update content successful : ${contentUpdated[0].id}`;
    }
    return `Have some error`;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @Delete('deletecontent')
  async delete(@Query('id') id: string) {
    let contentremoved = await this.contentService.removeById(id);
    if (contentremoved != null) {
      return `Update content successful : ${contentremoved[0].id}`;
    }
    return `Have some error`;
  }

  @Post('shareLog')
  async addShareLog(@Body() createShareLog: CreateShareLog) {
    let shareLogCreated = await this.shareService.addShareLog(createShareLog);
    if (shareLogCreated != null) {
      return `Save new log successful : ${shareLogCreated.id}`;
    }
    return `Have some error`;
  }
}
