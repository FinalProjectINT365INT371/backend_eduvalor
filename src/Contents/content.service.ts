import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UploadedFile,
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

  async create(createContent: CreateContent,@UploadedFile() file ): Promise<ContentData> {
    const createdContent = new this.ContentModel(createContent);
    const genId = await this.generateNewId();
    createdContent._id = genId;
    createdContent.CreateDate = new Date().toLocaleString();
    createdContent.UpdateDate = new Date().toLocaleString();
    if (file != null) {
      // createContent.ImageFile.forEach((image, index) => {
      //   let imageName = genId + '_' + index++;
      //   this.uploadService.uploadImage(image, 'Content', imageName);
      // });
      let imageName = genId + '_' + 1;
      this.uploadService.uploadImage(file, 'content', imageName);
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
}
