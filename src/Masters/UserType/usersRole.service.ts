import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserRole } from './usersRole.schema';
import { Model } from 'mongoose';
import { CreateUserRole } from './dto/usersRole.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel('userRoles') private readonly UserRoleModel: Model<UserRole>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async create(createUserRole: CreateUserRole): Promise<UserRole> {
    const createdVideo = new this.UserRoleModel(createUserRole);
    return await createdVideo.save();
  }

  async findAll() {
    return await this.UserRoleModel.find({}).sort({ score: 'desc' }).exec();
  }

  async findById(id) {
    return await this.UserRoleModel.find({ _id: id }).exec();
  }

  // async updateView(id) {
  //   const UserRoleList = await this.UserRoleModel.find({ _id: id }).exec();
  //   await this.UserRoleModel
  //     .update(
  //       { _id: id },
  //       { view: videoList[0].view + 1, score: videoList[0].score + 1 },
  //       { upsert: true },
  //     )
  //     .exec();
  // }

  async removeById(id) {
    return await this.UserRoleModel.remove({ _id: id }).exec();
  }
}
