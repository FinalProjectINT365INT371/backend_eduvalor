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
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentData } from './ContentData/contentData.schema';
import { UploadService } from 'src/Upload/upload.service';
import { Logger } from 'winston';
import { SearchService } from './search.service';
import { UpdateContent } from './ContentData/dto/updateContent.dto';
import { CommentService } from './Comment/comment.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    private readonly uploadService: UploadService,
    @Inject('winston')
    private readonly logger: Logger,
    private readonly searchService: SearchService,
    private readonly commentService: CommentService,
  ) {}
  EOF = 'End of Function';
  async findAllcontentId() {
    let contents = await this.ContentModel.find(
      {
        DeleteFlag: false,
      },
      { _id: 1 },
    )
      .sort({ UpdateDate: 'desc' })
      .exec();
    if (contents.length == 0 || contents == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    return contents;
  }
  async findAll() {
    this.logger.debug('Function : Find All Content');
    let contents = await this.ContentModel.find({ DeleteFlag: false })
      .sort({ UpdateDate: 'desc' })
      .exec();
    if (contents.length == 0 || contents == null) {
      let res = "This content doesn't exist";
      this.logger.error(res);
      
      throw new NotFoundException(res);
    }
    let contentList = [];
    for (const content of contents) {
      let textdata = content.TextData[0];
      let imageList = await this.getImageInContent(content.id);
      content.TextData[0] = await this.replceImageUrl(textdata, imageList);
      for (let index = 0; index < content.Comment.length; index++) {
        const comment = content.Comment[index];
        if (comment.DeleteFlag == true) {
          content.Comment.splice(index, 1);
        }
      }
      contentList.push(content);
    }

    this.logger.debug(contentList);
    //this.logger.debug(this.EOF);
    return contentList;
  }

  async findById(id) {
    this.logger.debug(`Function : Find Content - ${id}`);
    let content = await this.ContentModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();

    let contentUpdateView = content;
    if (content != null) {
      let textdata = content.TextData[0];
      let imageList = await this.getImageInContent(id);
      let commentFilter = [];
      let approveFilter = [];
      content.TextData[0] = await this.replceImageUrl(textdata, imageList);
      for (let index = 0; index < content.Comment.length; index++) {
        let comment = content.Comment[index];
        if (comment.DeleteFlag == false) {
          commentFilter.push(comment);
        }
      }

      while (content.Comment.length > 0) {
        content.Comment.pop();
      }

      for (const comment of commentFilter) {
        content.Comment.push(comment);
      }

      for (let index = 0; index < content.ApproveData.length; index++) {
        let approve = content.ApproveData[index];
        if (approve.DeleteFlag == false) {
          approveFilter.push(approve);
        }
      }

      while (content.ApproveData.length > 0) {
        content.ApproveData.pop();
      }

      for (const approve of approveFilter) {
        content.ApproveData.push(approve);
      }
      //content.Comment.concat(commentFilter);
      console.log(content.Comment);

      this.logger.debug(content);
      //this.logger.debug(this.EOF);
      let view = content.View + 1;
      let contentUpdateView = await this.ContentModel.findOneAndUpdate(
        { _id: id, DeleteFlag: false },
        { $set: { View: view } },
      ).exec();
      return content;
      //View update
    } else {
      let res = "This content doesn't exist";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
  }

  async findImageId(id) {
    this.logger.debug(`Function : Find Image - ${id}`);
    return await this.uploadService.getSignedUrlS3(id, 'eduvalor-contents');
  }

  async create(
    createContent: CreateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
    @UploadedFiles() cover: Array<Express.Multer.File>,
  ): Promise<ContentData> {
    const createdContent = new this.ContentModel(createContent);
    const genId = await this.generateNewId();
    this.logger.debug(`Function : Create Content - ${genId}`);
    if (createdContent.TextData.length <= 0) {
      let res = 'This content must have some data';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }
    createdContent._id = genId;
    createdContent.CreateDate = new Date().toLocaleString();
    createdContent.UpdateDate = new Date().toLocaleString();
    createdContent.DeleteFlag = false;
    createdContent.Share = 0;
    createdContent.View = 0;
    if (typeof file !== 'undefined') {
      if (file.length > 0) {
        file.forEach((image, index) => {
          let imageName = genId + '_' + index++;
          let fileName = genId + '/' + imageName + '.png';
          this.uploadService.uploadFile(image, 'eduvalor-contents', fileName);
          createdContent.ImageUrl.push(genId + '/' + imageName + '.png');
        });
      }
    }

    if (typeof cover !== 'undefined') {
      if (cover.length > 0) {
        cover.forEach((image, index) => {
          let imageName = 'cover';
          let fileName = genId + '/' + imageName + '.png';
          this.uploadService.uploadFile(image, 'eduvalor-contents', fileName);
          createdContent.ImageUrl.push(genId + '/' + imageName + '.png');
        });
      }
    }
    let textData = createdContent.TextData[0];
    createdContent.TextData[0] = this.replceImageName(
      textData,
      createdContent.ImageUrl,
    );
    try {
      await createdContent.save();
    } catch (error) {
      let res = "Can't save new content";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.debug(createdContent);
    //this.logger.debug(this.EOF);
    return createdContent;
  }

  async updateContent(
    id,
    createContent: UpdateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
    @UploadedFiles() cover: Array<Express.Multer.File>,
  ) {
    let content = await this.ContentModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    this.logger.debug(`Function : Update Content - ${id}`);
    if (content == null) {
      let res = "This content doesn't exist";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    if (createContent.TextData.length <= 0) {
      let res = 'This content must have some data';
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new BadRequestException(res);
    }
    content.ImageUrl.splice(0, content.ImageUrl.length);
    await this.uploadService.removeImageS3Directory(
      'eduvalor-contents',
      content._id.toString(),
    );
    if (typeof file !== 'undefined') {
      if (file.length > 0) {
        file.forEach((image, index) => {
          let imageName = content._id + '_' + index++;
          let fileName = content._id + '/' + imageName + '.png';
          this.uploadService.uploadFile(image, 'eduvalor-contents', fileName);
          content.ImageUrl.push(content._id + '/' + imageName + '.png');
        });
        let textData = createContent.TextData[0];
        content.TextData[0] = this.replceImageName(textData, content.ImageUrl);
      }
    }

    if (typeof cover !== 'undefined') {
      if (cover.length > 0) {
        cover.forEach((image, index) => {
          let imageName = 'cover';
          let fileName = content._id + '/' + imageName + '.png';
          this.uploadService.uploadFile(image, 'eduvalor-contents', fileName);
          content.ImageUrl.push(content._id + '/' + imageName + '.png');
        });
      }
    }

    await content.updateOne(createContent).exec();
    content.UpdateDate = new Date().toLocaleString();
    try {
      await content.save();
    } catch (error) {
      let res = "Can't update content";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    //this.logger.debug(this.EOF);
    let updatedContent = await this.ContentModel.find({ _id: id }).exec();
    this.logger.debug(updatedContent);
    return updatedContent;
  }

  async removeById(id) {
    this.logger.debug(`Function : Remove Content - ${id}`);
    const content = await this.ContentModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    if (content == null) {
      let res = "This content doesn't exist or aleady removed";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    content.DeleteFlag = true;
    content.UpdateDate = new Date().toLocaleString();

    if (content.Comment.length > 0) {
      let comments = await this.commentService.findCommentByContentId(
        content.id,
      );
      comments.forEach((comment) => {
        comment.DeleteFlag = true;
        comment.save();
      });
      for (let index = 0; index < comments.length; index++) {        
        await this.ContentModel.updateOne(
          { _id: id, 'Comment._id': comments[index].id },
          { $set: { 'Comment.$.DeleteFlag': true } },
       ).exec();
      }
    }

    try {
      await content.save();
    } catch (error) {
      let res = "Can't remove content";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    //this.logger.debug(this.EOF);
    return await this.ContentModel.find({ _id: id }).exec();
  }

  async generateNewId() {
    let lastId = Math.round(100000 + Math.random() * 900000);
    let genId = 'CT_' + (lastId + 1);
    let content = await this.ContentModel.findOne({
      _id: genId,
      DeleteFlag: false,
    }).exec();

    if (content != null) {
      do {
        lastId = Math.round(100000 + Math.random() * 900000);
        genId = 'CT_' + (lastId + 1);
        content = await this.ContentModel.findOne({
          _id: genId,
          DeleteFlag: false,
        }).exec();
      } while (content == null);
    }
    return genId;
  }

  async getImageInContent(id) {
    const content = await this.ContentModel.findOne({ _id: id }).exec();
    var imagesMinioUrl = [];
    if (content == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    let imageList = content.ImageUrl;
    if (imageList.length > 0) {
      imagesMinioUrl = await this.uploadService.getImageListS3InContent(
        imageList,
      );
    }
    return imagesMinioUrl;
  }

  replceImageName(text: String, imageList: [String]) {
    let convertText = '';
    let newtext = text.split(`<img src="">`);
    if (newtext != null) {
      newtext.forEach((text, index, newtext) => {
        if (index !== newtext.length - 1) {
          convertText = convertText + text + `<img src="${imageList[index]}">`;
        } else {
          convertText = convertText + text;
        }
      });
    }
    console.log(convertText);
    return convertText;
  }

  async replceImageUrl(text: String, imageUrlList: any[]) {
    let convertText = text;
    imageUrlList.forEach((imageUrl) => {
      let imageName = imageUrl.split(' : ')[0];
      let imageurl = imageUrl.split(' : ')[1];

      convertText = convertText.replace(imageName, imageurl);
      //console.log(convertText);
    });
    return convertText;
  }
}
