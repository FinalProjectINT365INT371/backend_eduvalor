import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { generateKey } from 'crypto';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class UploadService {
  constructor(private readonly minioClient: MinioService) {}

  async listAllBuckets() {
    return this.minioClient.client.listBuckets();
  }

  async uploadImage(@UploadedFile() file, Buckets: string, imageName: string) {
    this.minioClient.client.putObject(
      Buckets,
      imageName,
      file.buffer,
      function (err) {
        if (err) return `${'Unable to upload : ' + imageName}`;
        console.log(`${'Uploaded : ' + imageName}`);
      },
    );
    return `${'Uploaded : ' + imageName}`;
  }

  async getImage(imageName: string, Buckets: string) {
    let imageMinio = '';
    this.minioClient.client.presignedUrl(
      'GET',
      Buckets,
      imageName,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return `${'Unable to get : ' + imageName}`;
        imageMinio = presignedUrl;
        console.log(`${'imageUrl : ' + imageMinio}`);
      },
    );
   
    let imageUrl  = await imageMinio;
    return `${'imageUrl : ' + imageUrl}`;
    //if not found FE use url and check HttpStatus
  }

  async removeImage(imageName: string, Buckets: string) {
    this.minioClient.client.removeObject(Buckets, imageName, function (err) {
      if (err) return `${'Unable to remove : ' + imageName}`;
      console.log(`Removed : ${imageName}`);
    });
    return `Removed : ${imageName}`;
    //if not found FE use url and check HttpStatus
  }
}
