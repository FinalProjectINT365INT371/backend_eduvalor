import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UploadedFile,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class UploadService {
  constructor(private readonly minioClient: MinioService) {}

  async listAllBuckets() {
    return this.minioClient.client.listBuckets();
  }

  async uploadImage(@UploadedFile() file, Buckets: string, imageName: string) {
    const metadata = {
      'Content-type': file.mimetype,
    };
    this.minioClient.client.putObject(
      Buckets,
      imageName,
      file.buffer,
      file.size,
      metadata,
      function (err) {
        if (err) return `${'Unable to upload : ' + imageName}`;
        console.log(`${'Uploaded : ' + imageName}`);
      },
    );
    return `${'Uploaded : ' + imageName}`;
  }

  async removeImage(imageName: string, Buckets: string) {
    this.minioClient.client.removeObject(Buckets, imageName, function (err) {
      if (err) return `${'Unable to remove : ' + imageName}`;
      console.log(`Removed : ${imageName}`);
    });
    return `Removed : ${imageName}`;
    //if not found FE use url and check HttpStatus
  }

  async getSignedUrl(imageName: string, Buckets: string) {
    return new Promise((resolve, reject) => {
      this.minioClient.client.presignedUrl(
        'GET',
        Buckets,
        imageName,
        24 * 60 * 60,
        function (err, presignedUrl) {
          if (err) reject(`${'Unable to get : ' + imageName}`);
          //console.log(`${'imageUrl : ' + presignedUrl}`);
          resolve(`${'imageUrl : ' + presignedUrl}`);
        },
      );
    });
  }

  async getImageListInContent(items: [String]) {
    let imagesUrl = [];
    for (let item of items) {
      let signedUrl = await this.getSignedUrl(item.toString(), 'content');
      signedUrl = signedUrl.toString().replace('imageUrl', item.toString());
      imagesUrl.push(signedUrl);
    }
    return imagesUrl;
  }
  async getImageList(folder: string, Buckets: string) {
    var data = [];
    return new Promise((resolve) => {
      var stream = this.minioClient.client.listObjects(Buckets, folder, true);
      stream.on('data', function (obj) {
        data.push(obj);
      });
      stream.on('end', function (obj) {
        console.log(data);
        resolve(data);
      });
    });
  }
}
