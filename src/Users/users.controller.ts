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
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UsersProfileService } from './Profile/profile.service';
import { CreateUserProfile } from './Profile/dto/profile.dto';
import { ValidationPipe } from 'src/validation.pipe';
import { UpdateContent } from 'src/Contents/ContentData/dto/updateContent.dto';
import { UpdateUserProfile } from './Profile/dto/updateProfile.dto';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly UsersProfileService: UsersProfileService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER, ROLES.ADMIN, ROLES.CONTENT_CREATOR)
  @Delete('deleteuser')
  async delete(@Query('id') id: string) {
    let userRemoved = await this.UsersProfileService.removeProfileById(id);
    if (userRemoved != null) {
      return `Update user successful : ${userRemoved[0].id}`;
    }
    return `Have some error`;
  }
}
