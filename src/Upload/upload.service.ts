import {
  Inject,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { Budgets, S3 } from 'aws-sdk';
import { Logger } from 'winston';
@Injectable()
export class UploadService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,) {}

  // async listAllBuckets() {
  //   return this.minioClient.client.listBuckets();
  // }

  // async uploadImage(@UploadedFile() file, Buckets: string, imageName: string) {
  //   const metadata = {
  //     'Content-type': file.mimetype,
  //   };
  //   this.minioClient.client.putObject(
  //     Buckets,
  //     imageName,
  //     file.buffer,
  //     file.size,
  //     metadata,
  //     function (err) {
  //       if (err) return `${'Unable to upload : ' + imageName}`;
  //       console.log(`${'Uploaded : ' + imageName}`);
  //     },
  //   );
  //   return `${'Uploaded : ' + imageName}`;
  // }

  // async removeImage(imageName: string, Buckets: string) {
  //   this.minioClient.client.removeObject(Buckets, imageName, function (err) {
  //     if (err) return `${'Unable to remove : ' + imageName}`;
  //     console.log(`Removed : ${imageName}`);
  //   });
  //   return `Removed : ${imageName}`;
  //   //if not found FE use url and check HttpStatus
  // }

  // async getSignedUrl(imageName: string, Buckets: string) {
  //   return new Promise((resolve, reject) => {
  //     this.minioClient.client.presignedUrl(
  //       'GET',
  //       Buckets,
  //       imageName,
  //       24 * 60 * 60,
  //       function (err, presignedUrl) {
  //         if (err) reject(`${'Unable to get : ' + imageName}`);
  //         //console.log(`${'imageUrl : ' + presignedUrl}`);
  //         resolve(`${'imageUrl : ' + presignedUrl}`);
  //       },
  //     );
  //   });
  // }

  // async getImageListInContent(items: [String]) {
  //   let imagesUrl = [];
  //   for (let item of items) {
  //     let signedUrl = await this.getSignedUrl(item.toString(), 'content');
  //     signedUrl = signedUrl.toString().replace('imageUrl', item.toString());
  //     imagesUrl.push(signedUrl);
  //   }
  //   return imagesUrl;
  // }
  // async getImageList(folder: string, Buckets: string) {
  //   var data = [];
  //   return new Promise((resolve) => {
  //     var stream = this.minioClient.client.listObjects(Buckets, folder, true);
  //     stream.on('data', function (obj) {
  //       data.push(obj);
  //     });
  //     stream.on('end', function (obj) {
  //       console.log(data);
  //       resolve(data);
  //     });
  //   });
  // }

  // S3 Service
  async uploadFile(@UploadedFile() file, Buckets: string, imageName: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: Buckets,
      Body: file.buffer,
      Key: imageName,
      ContentType: file.mimetype,
    })
      .promise(); 
    this.logger.debug(`${'Uploaded : ' + imageName}`);
    return `${'Uploaded : ' + uploadResult.Key}`;
  }

  async removeImageS3(imageName: string, Buckets: string) {
    const s3 = new S3();
    await s3.deleteObject({Bucket:Buckets , Key:imageName}).promise();
    this.logger.debug(`Removed Images : ${imageName}`);
    return `Removed Images : ${imageName}`;
    //if not found FE use url and check HttpStatus
  }

  async getSignedUrlS3(imageName: string, Buckets: string) {   
    const s3 = new S3();
    const param = {'Bucket': Buckets, 'Key': imageName};
    this.logger.debug(param);
    const url = s3.getSignedUrl('getObject', param);
    this.logger.info(`${'imageUrl : ' + url}`);
    return `${'imageUrl : ' + url}`;
  }

  async getImageListS3(folder: string, Buckets: string) {
    const s3 = new S3();
    var list = []
    let param = { 'Bucket':  Buckets, 'Prefix': `${folder}`,};
    await s3.listObjects(param, function(err, data) {
      if (err) console.log(err, err.stack); 
      else { 
      this.logger.info(data); 
      list = data.Contents;
      }}).promise();  
    return list ;
  
  }

  async getImageListS3InContent(items: [String]) {
    let imagesUrl = [];
    for (let item of items) {
      let signedUrl = await this.getSignedUrlS3(item.toString(), 'eduvalor-contents');
      signedUrl = signedUrl.toString().replace('imageUrl', item.toString());
      imagesUrl.push(signedUrl);
    }
    return imagesUrl;
  }
}

