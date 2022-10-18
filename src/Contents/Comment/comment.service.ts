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
import { CommentContent } from './dto/createComment.dto';
import { DeleteComment, UpdateComment } from './dto/updateComment.dto';
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
    let contents = await this.ContentModel.findOne({
      _id: createdComment.ContentId,
      DeleteFlag: false,
    }).exec();
    if (contents == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    const genId = await this.generateNewId(contents);
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
    contents.Comment.push(createdComment);

    try {
      await createdComment.save();
      await contents.save();
    } catch (error) {
      let res = "Can't save new comment";
      this.logger.error(error);
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(createdComment);
    return createdComment;
  }

  /*Update*/
  async updateComment(updateComment: UpdateComment): Promise<CommentData> {
    let content = await this.ContentModel.findOne({
      _id: updateComment.ContentId,
      DeleteFlag: false,
    }).exec();
    if (content == null) {
      throw new NotFoundException("This content doesn't exist");
    }

    let commentToUpdate = await this.CommentModel.findOne({
      _id: updateComment.CommentId,
      ContentId: updateComment.ContentId,
      UserId: updateComment.UserId,
      DeleteFlag: false,
    }).exec();
    if (commentToUpdate == null) {
      throw new NotFoundException("This comment doesn't exist");
    }
    this.logger.debug(`Function : Update Comment - ${updateComment.CommentId}`);
    if (updateComment.Comment == null) {
      let res = 'This comment must have some data';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }

    commentToUpdate.Comment = updateComment.Comment;
    commentToUpdate.UpdateDate = new Date().toLocaleString();

    for (let index = 0; index < content.Comment.length; index++) {
      if (content.Comment[index]._id == commentToUpdate.id) {
        content.Comment[index].UpdateDate = commentToUpdate.UpdateDate;
        content.Comment[index].Comment = commentToUpdate.Comment;    
      }
    }
    await content.updateOne(content).exec();
    try {
      await commentToUpdate.save();
      await content.save();
    } catch (error) {
      let res = "Can't update comment";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(commentToUpdate);
    return commentToUpdate;
  }
  /*Delete*/
  async deleteComment(deleteComment: DeleteComment): Promise<CommentData> {
    let content = await this.ContentModel.findOne({
      _id: deleteComment.ContentId,
      DeleteFlag: false,
    }).exec();
    if (content == null) {
      throw new NotFoundException("This content doesn't exist");
    }

    let commentToDelete = await this.CommentModel.findOne({
      _id: deleteComment.CommentId,
      ContentId: deleteComment.ContentId,
      UserId: deleteComment.UserId,
      DeleteFlag: false,
    }).exec();
    if (commentToDelete == null) {
      throw new NotFoundException("This comment doesn't exist");
    }
    this.logger.debug(`Function : Delete Comment - ${deleteComment.CommentId}`);

    commentToDelete.DeleteFlag = true
    commentToDelete.UpdateDate = new Date().toLocaleString();

    for (let index = 0; index < content.Comment.length; index++) {
      if (content.Comment[index]._id == commentToDelete.id) {
        content.Comment[index].UpdateDate = commentToDelete.UpdateDate;
        content.Comment[index].DeleteFlag = true   
      }
    }
    await content.updateOne(content).exec();
    try {
      await commentToDelete.save();
      await content.save();
    } catch (error) {
      let res = "Can't update comment";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(commentToDelete);
    return commentToDelete;
  }
  // async generateNewId(content: ContentData) {
  //   let genId = '';
  //   if (!content.Comment.length) {
  //     genId = content.id + '_CM_' + 1;
  //     return genId;
  //   }
  //   let index = content.Comment.length - 1;
  //   let lastId = parseInt(
  //     content.Comment[index]._id.toString().split('_CM_')[1],
  //   );
  //   genId = content.id + '_CM_' + (lastId + 1);
  //   return genId;
  // }

  async generateNewId(content: ContentData) {
    let lastId = Math.round(100000000 + Math.random() * 900000000);
    let genId = content.id + '_CM_'  + (lastId + 1);
    let commentCheck = await this.CommentModel.findOne({
      _id: genId,
      DeleteFlag: false,
    }).exec();

    if (commentCheck != null) {
      do {
        lastId = Math.round(100000 + Math.random() * 900000);
        genId = content.id + '_CM_' + (lastId + 1);
        commentCheck = await this.CommentModel.findOne({
          _id: genId,
          DeleteFlag: false,
        }).exec();
      } while (commentCheck == null);
    }
    return genId;
  }
}
