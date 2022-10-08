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
import { ContentApproving } from './contentApproving.schema';
import { CreateContentApproving } from './dto/createContentApproving.dto';
import {
  DeleteContentApproving,
  UpdateContentApproving,
} from './dto/updateContentApproving';
@Injectable()
export class ContentApprovingService {
  constructor(
    @InjectModel('contentApproving')
    private readonly ContentApprovingModel: Model<ContentApproving>,
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async addContentApproving(
    createApproving: CreateContentApproving,
  ): Promise<ContentApproving> {
    const createdApproving = new this.ContentApprovingModel(createApproving);
    let contents = await this.ContentModel.findOne({
      _id: createdApproving.ContentId,
      DeleteFlag: false,
    }).exec();
    if (contents == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    const genId = await this.generateNewId(contents);
    this.logger.debug(`Function : Create Content Approving - ${genId}`);
    if (createdApproving.ApproveStatus == null) {
      let res = 'This content approving must have status';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }
    createdApproving._id = genId;
    createdApproving.CreateDate = new Date().toLocaleString();
    createdApproving.UpdateDate = new Date().toLocaleString();
    createdApproving.DeleteFlag = false;
    contents.ApproveData.push(createdApproving);

    try {
      await createdApproving.save();
      await contents.save();
    } catch (error) {
      let res = "Can't save new content approving";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(createdApproving);
    return createdApproving;
  }

  /*Update*/
  async updateContentApproved(
    updateContentApproving: UpdateContentApproving,
  ): Promise<ContentApproving> {
    let content = await this.ContentModel.findOne({
      _id: updateContentApproving.ContentId,
      DeleteFlag: false,
    }).exec();
    if (content == null) {
      throw new NotFoundException("This content doesn't exist");
    }

    let approvedContentToUpdate = await this.ContentApprovingModel.findOne({
      _id: updateContentApproving.ApproveId,
      ContentId: updateContentApproving.ContentId,
      UserId: updateContentApproving.UserId,
      DeleteFlag: false,
    }).exec();
    if (approvedContentToUpdate == null) {
      throw new NotFoundException("This content approved doesn't exist");
    }
    this.logger.debug(
      `Function : Update Content Approving - ${updateContentApproving.ApproveId}`,
    );
    if (updateContentApproving.ApproveStatus == null) {
      let res = 'This approve status must have some data';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }

    approvedContentToUpdate.ApproveStatus =
      updateContentApproving.ApproveStatus;
    approvedContentToUpdate.Comment = updateContentApproving.Comment;
    approvedContentToUpdate.UpdateDate = new Date().toLocaleString();

    for (let index = 0; index < content.ApproveData.length; index++) {
      if (content.ApproveData[index]._id == approvedContentToUpdate.id) {
        content.ApproveData[index].UpdateDate =
          approvedContentToUpdate.UpdateDate;
        content.ApproveData[index].Comment = approvedContentToUpdate.Comment;
        content.ApproveData[index].ApproveStatus =
          approvedContentToUpdate.ApproveStatus;
      }
    }
    await content.updateOne(content).exec();
    try {
      await approvedContentToUpdate.save();
      await content.save();
    } catch (error) {
      let res = "Can't update content approved";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(approvedContentToUpdate);
    return approvedContentToUpdate;
  }
  /*Delete*/
  async deleteContentApproved(
    deleteContentApproving: DeleteContentApproving,
  ): Promise<ContentApproving> {
    let content = await this.ContentModel.findOne({
      _id: deleteContentApproving.ContentId,
      DeleteFlag: false,
    }).exec();
    if (content == null) {
      throw new NotFoundException("This content approved doesn't exist");
    }

    let contentApprovedToDelete = await this.ContentApprovingModel.findOne({
      _id: deleteContentApproving.ApproveId,
      ContentId: deleteContentApproving.ContentId,
      UserId: deleteContentApproving.UserId,
      DeleteFlag: false,
    }).exec();
    if (contentApprovedToDelete == null) {
      throw new NotFoundException("This Content Approving doesn't exist");
    }
    this.logger.debug(
      `Function : Delete Content Approving - ${deleteContentApproving.ApproveId}`,
    );

    contentApprovedToDelete.DeleteFlag = true;
    contentApprovedToDelete.UpdateDate = new Date().toLocaleString();

    for (let index = 0; index < content.ApproveData.length; index++) {
      if (content.ApproveData[index]._id == contentApprovedToDelete.id) {
        content.ApproveData[index].UpdateDate =
          contentApprovedToDelete.UpdateDate;
        content.ApproveData[index].DeleteFlag = true;
      }
    }
    await content.updateOne(content).exec();
    try {
      await contentApprovedToDelete.save();
      await content.save();
    } catch (error) {
      let res = "Can't delete content approved";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(contentApprovedToDelete);
    return contentApprovedToDelete;
  }
  async generateNewId(content: ContentData) {
    let genId = '';
    if (!content.ApproveData.length) {
      genId = content.id + '_CP_' + 1;
      return genId;
    }
    let index = content.ApproveData.length - 1;
    let lastId = parseInt(
      content.ApproveData[index]._id.toString().split('_CM_')[1],
    );
    genId = content.id + '_CP_' + (lastId + 1);
    return genId;
  }
}
