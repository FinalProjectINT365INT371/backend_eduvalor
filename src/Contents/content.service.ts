import {
  BadRequestException,
  Injectable,
  Next,
  NotAcceptableException,
  NotFoundException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ContentDataSchema } from './ContentData/contentData.schema';
import { Model } from 'mongoose';
import { CreateContent } from './ContentData/dto/contentData.dto';
import { ContentData } from './ContentData/contentData.schema';
import mongoose from 'mongoose';
import { timeStamp } from 'console';
import { UploadService } from 'src/Upload/upload.service';
@Injectable()
export class ContentService {
  constructor(
    @InjectModel('contentData')
    private readonly ContentModel: Model<ContentData>,
    private readonly uploadService: UploadService,
  ) {}

  getHello(): string {
    return 'Hello Dev World!';
  }

  async findAll() {
    return await this.ContentModel.find({}).sort({ score: 'desc' }).exec();
  }

  async findById(id) {
    let content = await this.ContentModel.find({ _id: id }).exec();
    if (content.length > 0) {
      console.log(content);
      return content;
    }
    throw new NotFoundException("This content doesn't exist");
  }

  async findImageId(id) {
    return await this.uploadService.getSignedUrl(id, 'content');
  }

  async create(
    createContent: CreateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ): Promise<ContentData> {
    const createdContent = new this.ContentModel(createContent);
    const genId = await this.generateNewId();
    if (createdContent.TextData.length <= 0) {
      throw new BadRequestException('This content must have some data');
    }
    createdContent._id = genId;
    createdContent.CreateDate = new Date().toLocaleString();
    createdContent.UpdateDate = new Date().toLocaleString();
    if (file.length > 0) {
      file.forEach((image, index) => {
        let imageName = genId + '_' + index++;
        let fileName = genId + '/' + imageName + '.png';
        this.uploadService.uploadImage(image, 'content', fileName);
        createdContent.ImageUrl.push(genId + '/' + imageName + '.png');
      });
    }
    let textData = createdContent.TextData[0];
    createdContent.TextData[0] = this.replceImageName(textData,createdContent.ImageUrl);
    return await createdContent.save();
  }

  async updateContent(
    id,
    createContent: CreateContent,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    const content = await this.ContentModel.findOne({ _id: id }).exec();
    if (content == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    content.ImageUrl.splice(0, content.ImageUrl.length);
    await this.uploadService.removeImage(content._id.toString(), 'content');

    if (file.length > 0) {
      file.forEach((image, index) => {
        let imageName = content._id + '_' + index++;
        let fileName = content._id + '/' + imageName + '.png';
        this.uploadService.uploadImage(image, 'content', fileName);
        content.ImageUrl.push(content._id + '/' + imageName + '.png');
      });
      let textData = content.TextData[0];
      content.TextData[0] = this.replceImageName(textData,content.ImageUrl);
      // console.log(content.ImageUrl);
      // let imagesOfContent = Promise.resolve(
      //   await this.uploadService.getImageList(
      //     content._id.toString(),
      //     'content',
      //   ),
      // );
      // let imagesOfContents = imagesOfContent[0];
      // console.log(imagesOfContents);

      // const removeNotuseImages = (ImageUrl, imagesOfContents) => {
      //   const spreaded = [...ImageUrl, ...imagesOfContents];
      //   return spreaded.filter((el) => {
      //     return !(ImageUrl.includes(el) && imagesOfContents.includes(el));
      //   });
      // };

      // console.log(removeNotuseImages(content.ImageUrl, imagesOfContent));
      // let ImagestoRemove = removeNotuseImages(
      //   content.ImageUrl,
      //   imagesOfContent,
      // );
      // if (ImagestoRemove.length > 0) {
      //   ImagestoRemove.forEach((item) => {
      //     var index = content.ImageUrl.indexOf(item);
      //     if (index !== -1) {
      //       content.ImageUrl.splice(index, 1);
      //     }
      //     this.uploadService.removeImage(item, 'content');
      //   });
      // }
    }
    
    await content.updateOne(createContent).exec();
    content.UpdateDate = new Date().toLocaleString();
    await content.save();
    return await this.ContentModel.find({ _id: id }).exec();
  }

  async removeById(id) {
    const content = await this.ContentModel.findOne({ _id: id }).exec();
    if (content == null) {
      throw new NotFoundException("This content doesn't exist");
    }
    content.DeleteFlag = true;
    await content.save();
    return await this.ContentModel.find({ _id: id }).exec();
  }

  async generateNewId() {
    let lastContent = await this.ContentModel.find()
      .sort({ $natural: -1 })
      .limit(1);
    let lastId = parseInt(lastContent[0]._id.toString().split('_')[1]);
    let genId = 'CT_' + (lastId + 1);
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
      imagesMinioUrl = await this.uploadService.getImageListInContent(
        imageList,
      );
    }
    return imagesMinioUrl;
  }

  replceImageName(text: String, imageList: [String]) {
    let convertText = '';
    let newtext = text.split(`<img src="">`);
    newtext.forEach((text, index, newtext) => {
      if (index !== newtext.length - 1) {
        convertText = convertText + text + `<img src="${imageList[index]}">`;
      } else {
        convertText = convertText + text;
      }
    });
    console.log(convertText);
    return convertText;
  }
}
