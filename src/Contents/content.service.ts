import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentDataSchema } from './ContentData/contentData.schema';
import { Model } from 'mongoose';
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentData } from './ContentData/contentData.schema';
import mongoose from 'mongoose';
import { timeStamp } from 'console';
import { UploadService } from 'src/Upload/upload.service';
@Injectable()
export class ContentService {
  constructor(
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    private readonly uploadService: UploadService,
  ) {}

  getHello(): string {
    return 'Hello Dev World!';
  }

  async findAll() {
    return await this.ContentModel.find({}).sort({ score: 'desc' }).exec();
  }

  async findById(id) {
    return await this.ContentModel.find({ _id: id }).exec();
  }

  async findImageId(id) {
    return await this.uploadService.getSignedUrl(id, 'content');
  }

  async create(
    createContent: CreateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ): Promise<ContentData> {
    const createdContent = new this.ContentModel(createContent);
    const genId = await this.generateNewId();
    createdContent._id = genId;
    createdContent.CreateDate = new Date().toLocaleString();
    createdContent.UpdateDate = new Date().toLocaleString();
    if (file.length > 0) {
      file.forEach((image, index) => {
        let imageName = genId + '_' + index++;
        let fileName = genId + '/' + imageName + '.png';
        this.uploadService.uploadImage(image, 'content', fileName);
        createdContent.ImageUrl.push(genId +'/' + imageName + '.png');
      });
    }
    return await createdContent.save();
  }

  async updateContent(id, createContent: CreateContent) {
    const content = await this.ContentModel.findOne({ _id: id }).exec();
    if (content == null) {
      throw new NotFoundException();
    }
    await content.updateOne(createContent).exec();
    content.UpdateDate = new Date().toLocaleString();
    await content.save();
    return await this.ContentModel.find({ _id: id }).exec();
  }

  async removeById(id) {
    const content = await this.ContentModel.findOne({ _id: id }).exec();
    if (content == null) {
      throw new NotFoundException();
    }
    content.DeleteFlag = true;
    await content.save();
    return await this.ContentModel.find({ _id: id }).exec();
  }

  async generateNewId() {
    let lastContent = await this.ContentModel.find()
      .sort({ $natural: -1 })
      .limit(1);
    let lastId = parseInt(lastContent[0]._id.toString().split('_')[1]);
    let genId = 'CT_' + (lastId + 1);
    return genId;
  }

   async getImageInContent(id) {
     const content = await this.ContentModel.findOne({ _id: id }).exec();
     var imagesMinioUrl = [];
     if (content == null) {
       throw new NotFoundException("This content doesn't have any image");
     }
    let imageList = content.ImageUrl;
     if (imageList.length > 0) {
      imagesMinioUrl = await this.uploadService.getImageListInContent(imageList);
     }
     return imagesMinioUrl;
   }
}
