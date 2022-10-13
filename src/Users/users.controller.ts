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
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsersProfileService } from './Profile/profile.service';
import { CreateUserProfile } from './Profile/dto/profile.dto';
import { ValidationPipe } from 'src/validation.pipe';
import { UpdateContent } from 'src/Contents/ContentData/dto/updateContent.dto';
import { UpdateUserProfile } from './Profile/dto/updateProfile.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly UsersProfileService: UsersProfileService) {}

  @Get('getUserByID')
  async getById(@Query('id') id: string) {
    let user = await this.UsersProfileService.findById(id);
    return this.UsersProfileService.setResUserProfiles(user);
  }

  @UsePipes(ValidationPipe)
  @Post('adduser')
  @UseInterceptors(FilesInterceptor('ImageFile'))
  async create(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() createUser: CreateUserProfile,
  ) {
    try {
      let userCreated = await this.UsersProfileService.create(createUser, file);
      if (userCreated != null) {
        return `Save new user successful : ${userCreated.id}`;
      }
    } catch (exception) {
      console.log(exception);
      return `Have some error : ${exception}`;
    }
  }

  @UsePipes(ValidationPipe)
  @Put('edituser')
  @UseInterceptors(FilesInterceptor('ImageFile'))
  async edit(
    @Query('id') id: string,
    @Body() updateUser: UpdateUserProfile,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    try {
      let userUpdated = await this.UsersProfileService.updateProfile(
        id,
        updateUser,
        file,
      );
      if (userUpdated != null) {
        return `Update updateUser successful : ${userUpdated._id}`;
      }
    } catch (exception) {
      return `Have some error : ${exception}`;
    }
  }

  @Delete('deleteuser')
  async delete(@Query('id') id: string) {
    let userRemoved = await this.UsersProfileService.removeProfileById(id);
    if (userRemoved != null) {
      return `Update user successful : ${userRemoved[0].id}`;
    }
    return `Have some error`;
  }
}
