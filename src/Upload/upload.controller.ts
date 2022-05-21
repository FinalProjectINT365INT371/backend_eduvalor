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
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { MinioService } from 'nestjs-minio-client';
import { FileInterceptor } from '@nestjs/platform-express';
import { query } from 'express';
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('Upload/GetlistBuckets')
  getListFolder() {
    return this.uploadService.listAllBuckets();
  }

  @Get('Upload/GetlistImages')
  async getListImages(
    @Query('folder') folder: string,
    @Query('bucket') bucket: string,
  ) {
    var data;
    data = await this.uploadService.getImageList(folder, bucket);
    if (data.length === 0) {
      throw new NotFoundException('Not found images in this folder');
    } else return data;
  }

  @Post('Upload/image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file) {
    const filedata = {
      originalname: file.originalname,
      fileType: file.mimetype,
      filesize: file.size,
      filepath: file.path,
    };
    console.log(filedata);
    return this.uploadService.uploadImage(file, 'test', filedata.originalname);
  }

  @Get('Upload/GetImage')
  getImage(@Query('imageName') imageName: string) {
    return this.uploadService.getSignedUrl(imageName, 'test');
  }

  @Delete('Upload/removeImage')
  removeImage(@Query('imageName') imageName: string) {
    return this.uploadService.removeImage(imageName, 'test');
  }
}