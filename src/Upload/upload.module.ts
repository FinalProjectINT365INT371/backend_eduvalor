import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true,}),MinioModule.register({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECETE_KEY
  })],   
  controllers: [UploadController],
  providers: [ UploadService],
  exports : [ UploadService]
})
export class UploadModule {}
