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

  async searchContents(word: string, page: number, limit: number) {
    page = page-1
    if(page <= 0) {page = 0};
    this.logger.debug('Function : Search Contents by word');
    let contents = await this.ContentModel.find({
      Header: { $regex: `${word}`, $options: 'i' },
      DeleteFlag: false,
    })
      .sort({ UpdateDate: 'desc' })
      .limit(limit)
      .skip(page * limit)
      .exec();
    if (contents.length == 0 || contents == null) {
      let res = "Doesn't has any contents";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    return contents;
  }
}
