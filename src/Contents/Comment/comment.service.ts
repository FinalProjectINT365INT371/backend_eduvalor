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
import { ContentData } from '../ContentData/contentData.schema';
import { CommentData } from './comment.schama';
import { CommentContent } from './dto/comment.dto';
@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment')
    private readonly CommentModel: Model<CommentData>,
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async addComment(createComment: CommentContent): Promise<CommentData> {
    const createdComment = new this.CommentModel(createComment);
    const genId = await this.generateNewId();
    this.logger.debug(`Function : Create Comment - ${genId}`);
    if (createComment.Comment == null) {
      let res = 'This comment must have some data';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }
    createdComment._id = genId;
    createdComment.CreateDate = new Date().toLocaleString();
    createdComment.UpdateDate = new Date().toLocaleString();
    createdComment.DeleteFlag = false;

    let contents = await this.ContentModel.findOne({
      _id: createdComment.ContentId,
      DeleteFlag: false,
    }).exec();
    if (contents == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    console.log(contents);
    contents.Comment.push(createdComment);

    try {
      await createdComment.save();
      await contents.save();
    } catch (error) {
      let res = "Can't save new comment";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(createdComment);
    return createdComment;
  }

  /*Update*/
  /*Delete*/
  

  async generateNewId() {
    let lastComment = await this.CommentModel.find()
      .sort({ $natural: -1 })
      .limit(1);
    let lastId = parseInt(lastComment[0]._id.toString().split('_')[1]);
    let genId = 'CM_' + (lastId + 1);
    return genId;
  }
}
