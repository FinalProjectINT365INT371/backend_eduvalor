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

  async searchContentsFromHeader(header: string, page: number, size: number) {
    page = page - 1;
    if (page <= 0) {
      page = 0;
    }
    if (size <= 0) {
      size = 10;
    }
    this.logger.debug('Function : Search Contents by Header');
    let contents = await this.ContentModel.find({
      Header: { $regex: `${header}`, $options: 'i' },
      DeleteFlag: false,
    })
      .sort({ UpdateDate: 'desc' })
      .limit(size)
      .skip(page * size)
      .exec();
    if (contents.length == 0 || contents == null) {
      let res = "Doesn't has any contents";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    return contents;
  }

  async searchContentsFromTag(Tag: string, page: number, size: number) {
    page = page - 1;
    if (page <= 0) {
      page = 0;
    }
    if (size <= 0) {
      size = 10;
    }
    this.logger.debug('Function : Search Contents by Tag');
    let contents = await this.ContentModel.find({
      ContentCategory: { $all: [`${Tag}`] },
      DeleteFlag: false,
    })
      .sort({ UpdateDate: 'desc' })
      .limit(size)
      .skip(page * size)
      .exec();
    if (contents.length == 0 || contents == null) {
      let res = "Doesn't has any contents";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    return contents;
  }

  async searchContentsFromCreator(creator: string, page: number, size: number) {
    page = page - 1;
    if (page <= 0) {
      page = 0;
    }
    if (size <= 0) {
      size = 10;
    }
    this.logger.debug('Function : Search Contents by Creator');
    let contents = await this.ContentModel.find({
      CreateBy: { $regex: `${creator}`, $options: 'i' },
      DeleteFlag: false,
    })
      .sort({ UpdateDate: 'desc' })
      .limit(size)
      .skip(page * size)
      .exec();
    if (contents.length == 0 || contents == null) {
      let res = "Doesn't has any contents";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    return contents;
  }

  async searchContentsFromWord(word: string, page: number, size: number) {
    page = page - 1;
    if (page <= 0) {
      page = 0;
    }
    if (size <= 0) {
      size = 10;
    }
    this.logger.debug('Function : Search Contents by Word');
    let contents = await this.ContentModel.find({
      $or: [
        { Header: { $regex: `${word}`, $options: 'i' } },
        { ContentCategory: { $all: [`${word}`] } },
        { CreateBy: { $regex: `${word}`, $options: 'i' } },
      ],
      $and: [{ DeleteFlag: false }],
    })
      .sort({ UpdateDate: 'desc' })
      .limit(size)
      .skip(page * size)
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
