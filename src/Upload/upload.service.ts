import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class UploadService {
  constructor(private readonly minioClient: MinioService) {}

  async listAllBuckets() {
    return this.minioClient.client.listBuckets();
  }

  async uploadImage(@UploadedFile() file,Buckets :string) {
    this.minioClient.client.putObject(
      Buckets,
      file.originalname,
      file.buffer,
      function (err) {
        if (err) return `${'Unable to upload : ' + file.originalname}`;
      },
    );
    return `${'Uploaded : ' + file.originalname}`;
  }

  async getImage(imageName: string,Buckets :string) {
    let imageUrl = "";
    this.minioClient.client.presignedUrl(
      'GET',
      Buckets,
      imageName,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return console.log(err);
        imageUrl = presignedUrl;
        console.log(`${'imageUrl : ' + imageUrl}`);
      },
    );
    return `${'imageUrl : ' + imageUrl}`;
    //if not found FE use url and check HttpStatus
  }
}
