import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { ContentCategory } from './category.schema';
  import { Model } from 'mongoose';
  import { CreateContentCategory } from './dto/category.dto';
  
  @Injectable()
  export class ContentCategoryService {
    constructor(
      @InjectModel('contentCategory') private readonly ContentCategoryModel: Model<ContentCategory>,
    ) {}
  
    async create(createContentCategory: CreateContentCategory): Promise<ContentCategory> {
      let userRole =  await this.ContentCategoryModel.findOne({ _id: createContentCategory.Id }).exec();
      if (userRole != null) {
        throw new BadRequestException("This role id already exist");
      }
      const createdContentCategory = new this.ContentCategoryModel(createContentCategory);
      createdContentCategory._id = createContentCategory.Id;
      createdContentCategory.CreateDate = new Date().toLocaleString();
      createdContentCategory.UpdateDate = new Date().toLocaleString();
      if (createdContentCategory._id == null || createdContentCategory.CategoryName == null) {
        throw new BadRequestException('This role must have some data');
      }
      await createdContentCategory.save();
      return createdContentCategory;
    }
  
    async findAll() {
      let userRole = await this.ContentCategoryModel.find({ DeleteFlag: false })
        .sort({ _id: 'desc' })
        .exec();
      if (userRole.length == 0) {
        throw new NotFoundException("Content category doesn't exist");
      }
      return userRole;
    }
  
    async findById(id) {
      let userRole =  await this.ContentCategoryModel.findOne({ _id: id, DeleteFlag: false }).exec();
      if (userRole == null) {
        throw new NotFoundException("This role doesn't exist");
      }
      return userRole;
    }
  
    async update(id, updateContentCategory: CreateContentCategory): Promise<ContentCategory> {
      let contentCategory = await this.ContentCategoryModel.findOne({
        _id: id,
        DeleteFlag: false,
      }).exec();
      if (contentCategory == null) {
        throw new NotFoundException("Content category doesn't exist");
      }
      contentCategory.UpdateDate = new Date().toLocaleString();
      await contentCategory.updateOne(updateContentCategory).exec();
      await contentCategory.save();
      return await this.ContentCategoryModel.findOne({ _id: id }).exec();
    }
  
    async removeById(id) {
      let contentCategory = await this.ContentCategoryModel.findOne({
        _id: id,
        DeleteFlag: false,
      }).exec();
      if (contentCategory == null) {
        throw new NotFoundException("This Content category doesn't exist or aleady removed");
      }
      contentCategory.DeleteFlag = true;
      contentCategory.UpdateDate = new Date().toLocaleString();
      await contentCategory.save();
      return await this.ContentCategoryModel.findOne({ _id: id }).exec();
    }
  }
  