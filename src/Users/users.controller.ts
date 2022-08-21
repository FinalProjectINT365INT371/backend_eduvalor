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
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsersProfileService } from './Profile/profile.service';
import { CreateUserProfile } from './Profile/dto/profile.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly UsersProfileService: UsersProfileService) {}

  @Get()
  getAll() {
    return this.UsersProfileService.getHello();
  }

  @Post('adduser')
  @UseInterceptors(FilesInterceptor('ImageFile'))
  async create(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() createUser: CreateUserProfile,
  ) {
    console.log(file);
    console.log(createUser);
    let userCreated = await this.UsersProfileService.create(createUser, file);
    if (userCreated != null) {
      return `Save new user successful : ${userCreated.id}`;
    }
    return `Have some error`;
  }
}
