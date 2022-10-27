import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UploadedFiles,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'winston';
import { CreateShareLog } from './share.dto';
import { ShareLog } from './share.schema';
import { ContentData } from '../ContentData/contentData.schema';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel('shareLog')
    private readonly ShareLogModel: Model<ShareLog>,
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async addShareLog(
    createShareLog: CreateShareLog,
  ): Promise<ShareLog> {
    const shareLog = new this.ShareLogModel(createShareLog);
    let contents = await this.ContentModel.findOne({
      _id: shareLog.ContentId,
      DeleteFlag: false,
    }).exec();

    if (contents == null) {
      throw new NotFoundException("This content doesn't exist");
    }

    contents.Share = contents.Share + 1;
    const genId = await this.generateNewId(contents);
    this.logger.debug(`Function : Create Share Log - ${genId}`);
    if (shareLog.Platform == null) {
      let res = 'This log must have platform';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }
    shareLog._id = genId;
    shareLog.CreateDate = new Date().toLocaleString();
    shareLog.UpdateDate = new Date().toLocaleString();
    shareLog.DeleteFlag = false;

    try {
      await shareLog.save();
      await contents.save();
    } catch (error) {
      let res = "Can't save new log";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(shareLog);
    return shareLog;
  }

  async generateNewId(content: ContentData) {
    let lastId = Math.round(100000000 + Math.random() * 900000000);
    let genId = content.id + '_CS_' + (lastId + 1);
    let shareLogCheck = await this.ShareLogModel.findOne({
      _id: genId,
      DeleteFlag: false,
    }).exec();

    if (shareLogCheck != null) {
      do {
        lastId = Math.round(100000 + Math.random() * 900000);
        genId = content.id + '_CM_' + (lastId + 1);
        shareLogCheck = await this.ShareLogModel.findOne({
          _id: genId,
          DeleteFlag: false,
        }).exec();
      } while (shareLogCheck == null);
    }
    return genId;
  }
}
