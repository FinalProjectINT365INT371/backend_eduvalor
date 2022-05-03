import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentDataSchema } from './ContentData/contentData.schema';
import { Model } from 'mongoose';
import { CreateContent} from './ContentData/dto/contentData.dto';
import { ContentData } from './ContentData/contentData.schema';
@Injectable()
export class ContentService {
  constructor(
    @InjectModel('contentData') private readonly ContentModel: Model<ContentData>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async create(createContent: CreateContent): Promise<ContentData> {
    const createdVideo = new this.ContentModel(createContent);
    return await createdVideo.save();
  }

  async findAll() {
    return await this.ContentModel.find({}).sort({ score: 'desc' }).exec();
  }

  async findById(id) {
    return await this.ContentModel.find({ _id: id }).exec();
  }

  // async updateView(id) {
  //   const UserRoleList = await this.UserRoleModel.find({ _id: id }).exec();
  //   await this.UserRoleModel
  //     .update(
  //       { _id: id },
  //       { view: videoList[0].view + 1, score: videoList[0].score + 1 },
  //       { upsert: true },
  //     )
  //     .exec();
  // }

  async removeById(id) {
    return await this.ContentModel.remove({ _id: id }).exec();
  }
}
