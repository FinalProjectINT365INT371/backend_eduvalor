import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentDataSchema } from './ContentData/contentData.schema';
import { Model } from 'mongoose';
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentData } from './ContentData/contentData.schema';
import mongoose from 'mongoose';
@Injectable()
export class ContentService {
  constructor(
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
  ) {}
  getHello(): string {
    return 'Hello Dev World!';
  }

  async create(createContent: CreateContent): Promise<ContentData> {
    const createdContent = new this.ContentModel(createContent);
    createdContent._id = new mongoose.Types.ObjectId();
    return await createdContent.save();
  }

  async findAll() {
    return await this.ContentModel.find({}).sort({ score: 'desc' }).exec();
  }

  async findById(id) {
    return await this.ContentModel.find({ _id: new mongoose.Types.ObjectId(id)  }).exec();
  }

  async updateContent(id, createContent: CreateContent) {
    const content = await this.ContentModel.findOne({ _id: new mongoose.Types.ObjectId(id)  }).exec();
    if (content == null) {
      throw new NotFoundException();
    }
    await content.updateOne(createContent).exec(); 
    return await this.ContentModel.find({ _id: new mongoose.Types.ObjectId(id)  }).exec();
  }

  async removeById(id) {
    const content = await this.ContentModel.findOne({ _id: new mongoose.Types.ObjectId(id)  }).exec();
    if (content == null) {
      throw new NotFoundException();
    }
    content.DeleteFlag = true;
    await content.save();
    return await this.ContentModel.find({ _id: new mongoose.Types.ObjectId(id)  }).exec();
  }
}
