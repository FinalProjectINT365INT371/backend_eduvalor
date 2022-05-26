import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    let userRole =  await this.UserRoleModel.findOne({ _id: createUserRole.RoleId }).exec();
    if (userRole != null) {
      throw new BadRequestException("This role id already exist");
    }
    const createdUserRole = new this.UserRoleModel(createUserRole);
    createdUserRole._id = createUserRole.RoleId;
    createdUserRole.CreateDate = new Date().toLocaleString();
    createdUserRole.UpdateDate = new Date().toLocaleString();
    if (createdUserRole._id == null || createdUserRole.RoleName == null) {
      throw new BadRequestException('This role must have some data');
    }
    await createdUserRole.save();
    return createdUserRole;
  }

  async findAll() {
    let userRole = await this.UserRoleModel.find({ DeleteFlag: false })
      .sort({ _id: 'desc' })
      .exec();
    if (userRole.length == 0) {
      throw new NotFoundException("Roles doesn't exist");
    }
    return userRole;
  }

  async findById(id) {
    let userRole =  await this.UserRoleModel.findOne({ _id: id, DeleteFlag: false }).exec();
    if (userRole == null) {
      throw new NotFoundException("This role doesn't exist");
    }
    return userRole;
  }

  async update(id, updateUserRole: CreateUserRole): Promise<UserRole> {
    let userRole = await this.UserRoleModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    if (userRole == null) {
      throw new NotFoundException("This role doesn't exist");
    }
    userRole.UpdateDate = new Date().toLocaleString();
    await userRole.updateOne(updateUserRole).exec();
    await userRole.save();
    return await this.UserRoleModel.findOne({ _id: id }).exec();
  }

  async removeById(id) {
    let userRole = await this.UserRoleModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    if (userRole == null) {
      throw new NotFoundException("This role doesn't exist or aleady removed");
    }
    userRole.DeleteFlag = true;
    userRole.UpdateDate = new Date().toLocaleString();
    await userRole.save();
    return await this.UserRoleModel.findOne({ _id: id }).exec();
  }
}
