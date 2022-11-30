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
  UseGuards,
} from '@nestjs/common';
import { CreateContentCategory } from './dto/category.dto';
import { ContentCategoryService } from './contentCategory.service';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';

@Controller('contentCategory')
export class ContentCategoryController {
  constructor(
    private readonly contentCategoryService: ContentCategoryService,
  ) {}

  @Get()
  getAll() {
    return this.contentCategoryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER)
  @Get('getbyId')
  async getById(@Query('id') id: string) {
    return await this.contentCategoryService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER)
  @Post('add')
  async create(@Body() createContentCategory: CreateContentCategory) {
    return await this.contentCategoryService.create(createContentCategory);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER)
  @Put('update')
  async update(
    @Query('id') id: string,
    @Body() updateContentCategory: CreateContentCategory,
  ) {
    return await this.contentCategoryService.update(id, updateContentCategory);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER)
  @Delete('delete')
  async removeById(@Query('id') id: string) {
    return this.contentCategoryService.removeById(id);
  }
}
