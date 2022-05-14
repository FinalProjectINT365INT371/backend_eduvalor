import { Controller, Get, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
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

  @Post('Upload/image')
  @UseInterceptors(
    FileInterceptor('image'),
  )
  uploadImage(@UploadedFile() file) {
    const filedata = {
    	originalname: file.originalname,
    	fileType: file.mimetype,
      filesize: file.size,
      filepath: file.path
    };
    console.log(filedata); 
    return this.uploadService.uploadImage(file,'test');
  }

  @Get('Upload/GetImage')
  getImage(@Query('imageName') imageName:string) {
    return this.uploadService.getImage(imageName,'test');
  }

}
