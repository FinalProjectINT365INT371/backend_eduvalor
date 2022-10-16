import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { MinioService } from 'nestjs-minio-client';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Post('UploadS3/image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImageS3(@UploadedFile() file) {
    const filedata = {
      originalname: file.originalname,
      fileType: file.mimetype,
      filesize: file.size,
      filepath: file.path,
    };
    console.log(filedata);
    return this.uploadService.uploadFile(
      file,
      'eduvalorucket',
      filedata.originalname,
    );
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Delete('Upload/removeImageS3')
  removeImageS3(@Query('imageName') imageName: string) {
    return this.uploadService.removeImageS3(imageName, 'eduvalor-contents');
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Get('Upload/GetImageS3')
  getImageS3(@Query('imageName') imageName: string) {
    return this.uploadService.getSignedUrlS3(imageName, 'eduvalorucket');
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Get('Upload/GetlistImagesS3')
  async getListImagesS3(
    @Query('folder') folder: string,
    @Query('bucket') bucket: string,
  ) {
    var data;
    data = await this.uploadService.getImageListS3(folder, bucket);

    if (data.length === 0) {
      throw new NotFoundException('Not found images in this folder');
    } else return data;
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Delete('Upload/removeImageS3Directory')
  removeImageS3Directory(@Query('directory') directory: string) {
    return this.uploadService.removeImageS3Directory(
      'eduvalor-contents',
      directory,
    );
  }
}
