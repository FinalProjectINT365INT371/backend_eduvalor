import { Inject, Injectable, UploadedFile } from '@nestjs/common';
import { Budgets, S3 } from 'aws-sdk';
import { Logger } from 'winston';
@Injectable()
export class UploadService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  // S3 Service
  async uploadFile(@UploadedFile() file, Buckets: string, imageName: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
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
    await s3.deleteObject({ Bucket: Buckets, Key: imageName }).promise();
    this.logger.debug(`Removed Images : ${imageName}`);
    return `Removed Images : ${imageName}`;
    //if not found FE use url and check HttpStatus
  }

  async removeImageS3Directory(bucket, dir) {
    const listParams = {
      Bucket: bucket,
      Prefix: dir,
    };
    const s3 = new S3();
    const listedObjects = await s3.listObjectsV2(listParams).promise();
    if (listedObjects.Contents.length === 0) return;
    const deleteParams = {
      Bucket: bucket,
      Delete: { Objects: [] },
    };
    listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key });
    });
    await s3.deleteObjects(deleteParams).promise();
    if (listedObjects.IsTruncated) await this.removeImageS3Directory(bucket, dir);
  }

  async getSignedUrlS3(imageName: string, Buckets: string) {
    const s3 = new S3();
    const param = { Bucket: Buckets, Key: imageName };
    this.logger.debug(param);
    const url = s3.getSignedUrl('getObject', param);
    this.logger.debug(`${'imageUrl : ' + url}`);
    return `${'imageUrl : ' + url}`;
  }

  async getImageListS3(folder: string, Buckets: string) {
    const s3 = new S3();
    var list = [];
    let param = { Bucket: Buckets, Prefix: `${folder}` };
    await s3
      .listObjects(param, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
          this.logger.debug(data);
          list = data.Contents;
        }
      })
      .promise();
    return list;
  }

  async getImageListS3InContent(items: [String]) {
    let imagesUrl = [];
    for (let item of items) {
      let signedUrl = await this.getSignedUrlS3(
        item.toString(),
        'eduvalor-contents',
      );
      signedUrl = signedUrl.toString().replace('imageUrl', item.toString());
      imagesUrl.push(signedUrl);
    }
    return imagesUrl;
  }
}
