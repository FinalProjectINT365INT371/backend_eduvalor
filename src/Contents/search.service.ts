import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentData } from './ContentData/contentData.schema';
import { Logger } from 'winston';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async searchContent(word: string) {
    let contents = await this.ContentModel.find({
      Header: {$regex: `${word}`, $options: 'i'},
      DeleteFlag: false,
    })
      .sort({ UpdateDate: 'desc' })
      .limit(10)
      .exec();
    if (contents.length == 0 || contents == null) {
      throw new NotFoundException("Doesn't has any contents");
    }
    return contents;
  }
}
