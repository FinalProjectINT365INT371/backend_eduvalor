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

  @Get()
  getAll() {
    return this.UsersProfileService.getHello();
  }
  
  @UsePipes(ValidationPipe)
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

  @UsePipes(ValidationPipe)
  @Put('edituser')
  @UseInterceptors(FilesInterceptor('ImageFile'))
  async edit(
    @Query('id') id: string,
    @Body() updateUser: UpdateUserProfile,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    let userUpdated = await this.UsersProfileService.updateProfile(
      id,
      updateUser,
      file
    );
    if (userUpdated != null) {
      return `Update updateUser successful : ${userUpdated[0].id}`;
    }
    return `Have some error`;
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
