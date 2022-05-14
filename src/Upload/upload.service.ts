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
    let folder = Math.floor(Math.random() * 5000);
    let fileName = folder + '/' + imageName + ".png";
    this.minioClient.client.putObject(
      Buckets,
      fileName,
      file.buffer,
      function (err) {
        if (err) return `${'Unable to upload : ' + fileName}`;
        console.log(`${'Uploaded : ' + fileName}`);
      },
    );
    return `${'Uploaded : ' + fileName}`;
  }

  async getImage(imageName: string, Buckets: string) {
    let imageUrl = '';
    this.minioClient.client.presignedUrl(
      'GET',
      Buckets,
      imageName,
      24 * 60 * 60,
      function (err, presignedUrl) {
        if (err) return `${'Unable to get : ' + imageName}`;
        imageUrl = presignedUrl;
        console.log(`${'imageUrl : ' + imageUrl}`);
      },
    );
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
