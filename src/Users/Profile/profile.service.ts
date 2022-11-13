import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from './profile.schema';
import { Model } from 'mongoose';
import { CreateUserProfile, ResponseUserProfile } from './dto/profile.dto';
import { Logger } from 'winston';
import { UploadService } from 'src/Upload/upload.service';
import bcrypt from 'bcrypt';
import { UpdateUserProfile } from './dto/updateProfile.dto';
@Injectable()
export class UsersProfileService {
  constructor(
    @InjectModel('userProfile')
    private readonly UserProfileModel: Model<UserProfile>,
    @Inject('winston')
    private readonly logger: Logger,
    private readonly uploadService: UploadService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findByEmail(email) {
    let userProfile = await this.UserProfileModel.findOne({
      Email: email,
      GoogleAccess: true,
      DeleteFlag: false,
    }).exec();
    return userProfile;
  }

  async findByPSID(psid) {
    let userProfile = await this.UserProfileModel.findOne({
      PSID: psid,
      DeleteFlag: false,
    }).exec();
    return userProfile;
  }

  async findById(id) {
    let userProfile = await this.UserProfileModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    if (userProfile == null) {
      throw new NotFoundException("This user doesn't exist");
    }
    return userProfile;
  }

  async findByUsername(username) {
    let userProfile = await this.UserProfileModel.findOne({
      Username: username,
      DeleteFlag: false,
    }).exec();
    if (userProfile == null) {
      throw new NotFoundException("This user doesn't exist");
    }
    return userProfile;
  }

  async createByFB(req: any): Promise<any> {
    let file = [];
    let createUser = new CreateUserProfile();
    let findUser = await this.findByPSID(req.user.psid);
    console.log(findUser);
    if (findUser == null) {
      createUser.Email = req.user.email;
      createUser.Displayname = req.user.Displayname;
      createUser.PSID = req.user.psid;
      createUser.DeleteFlag = false;
      createUser.Role = 'ContentCreator';
      createUser.GoogleAccess = false;
      console.log(createUser);
      let user = await this.create(createUser, file);
      return user;
    }
    return findUser;
  }

  async createByGoogle(req: any): Promise<any> {
    let file = [];
    let createUser = new CreateUserProfile();
    let findUser = await this.findByEmail(req.user.email);
    console.log(findUser);
    if (findUser == null) {
      createUser.Email = req.user.email;
      createUser.Displayname = req.user.Displayname;
      createUser.PSID = '';
      createUser.DeleteFlag = false;
      createUser.Role = 'ContentCreator';
      createUser.GoogleAccess = true;
      console.log(createUser);
      let user = await this.create(createUser, file);
      return user;
    }
    return findUser;
  }
  async create(
    CreateUserProfile: CreateUserProfile,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ): Promise<ResponseUserProfile> {
    //Check Statement of this line
    // if (
    //   (CreateUserProfile.PSID == '' || CreateUserProfile.PSID == null) &&
    //   (CreateUserProfile.GoogleAccess == false || CreateUserProfile.GoogleAccess == null)
    // ) {
      let userProfile = await this.UserProfileModel.findOne({
        Username: CreateUserProfile.Username,
        DeleteFlag: false,
      }).exec();
      if (userProfile != null) {
        throw new NotAcceptableException('This username is already exist');
      }
    //}

    const bcrypt = require('bcrypt');
    const createdUser = new this.UserProfileModel(CreateUserProfile);
    const genId = await this.generateNewId();
    this.logger.debug(`Function : Create User - ${genId}`);
    createdUser._id = genId;
    if (createdUser.Password != null) {
      const passwordChange = await bcrypt.hash(createdUser.Password, 10);
      createdUser.Password = passwordChange;
    }
    if (createdUser.PSID == '' || createdUser.PSID == null) {
      createdUser.PSID = '';
    }
    if (createdUser.GoogleAccess == null) {
      createdUser.GoogleAccess = false;
    }
    createdUser.Role = 'Content Creator';
    createdUser.CreateDate = new Date().toLocaleString();
    createdUser.UpdateDate = new Date().toLocaleString();
    createdUser.DeleteFlag = false;
    if (file.length > 0) {
      file.forEach((image, index) => {
        if (index == 0) {
          let imageName = genId + '_' + 'PF';
          let fileName = genId + '/' + imageName + '.png';
          this.uploadService.uploadFile(image, 'eduvalor-users', fileName);
          createdUser.ImageUrl = genId + '/' + imageName + '.png';
        }
      });
    }
    try {
      await createdUser.save();
    } catch (error) {
      let res = "Can't save new user";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    this.logger.info(createdUser);
    //this.logger.debug(this.EOF);
    return this.setResUserProfiles(createdUser);
  }

  async updateProfile(
    id,
    updateUserProfile: UpdateUserProfile,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ): Promise<UserProfile> {
    let user = await this.UserProfileModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    this.logger.debug(`Function : Update User - ${id}`);
    if (user == null) {
      let res = "This user doesn't exist";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }

    console.log(user.ImageUrl);
    await this.uploadService.removeImageS3(user.ImageUrl, 'eduvalor-users');
    if (typeof file !== 'undefined') {
      if (file.length > 0) {
        file.forEach((image, index) => {
          if (index == 0) {
            let imageName = user._id + '_' + 'PF';
            let fileName = user._id + '/' + imageName + '.png';
            this.uploadService.uploadFile(image, 'eduvalor-users', fileName);
            user.ImageUrl = user._id + '/' + imageName + '.png';
          }
        });
      }
    }
    await user.updateOne(updateUserProfile).exec();
    user.UpdateDate = new Date().toLocaleString();
    try {
      await user.save();
    } catch (error) {
      let res = "Can't update user";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    let updatedUser = await this.UserProfileModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    this.logger.info(updatedUser);
    //this.logger.debug(this.EOF);
    return updatedUser;
  }

  async removeProfileById(id) {
    this.logger.debug(`Function : Remove User - ${id}`);
    const user = await this.UserProfileModel.findOne({
      _id: id,
      DeleteFlag: false,
    }).exec();
    if (user == null) {
      let res = "This user doesn't exist or aleady removed";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new NotFoundException(res);
    }
    user.DeleteFlag = true;
    user.UpdateDate = new Date().toLocaleString();
    try {
      await user.save();
    } catch (error) {
      let res = "Can't remove user";
      this.logger.error(res);
      //this.logger.debug(this.EOF);
      throw new HttpException(res, 503);
    }
    //this.logger.debug(this.EOF);
    return await this.UserProfileModel.find({ _id: id }).exec();
  }
  // async generateNewId() {
  //   let lastUser = await this.UserProfileModel.find()
  //     .sort({ $natural: -1 })
  //     .limit(1);
  //   let lastId = parseInt(lastUser[0]._id.toString().split('_')[1]);
  //   let genId = 'U_' + (lastId + 1);
  //   return genId;
  // }

  async generateNewId() {
    let lastId = Math.round(100000 + Math.random() * 900000);
    let genId = 'U_' + (lastId + 1);
    let userProfile = await this.UserProfileModel.findOne({
      _id: genId,
      DeleteFlag: false,
    }).exec();

    if (userProfile != null) {
      do {
        lastId = Math.round(100000 + Math.random() * 900000);
        genId = 'U_' + (lastId + 1);
        userProfile = await this.UserProfileModel.findOne({
          _id: genId,
          DeleteFlag: false,
        }).exec();
      } while (userProfile == null);
    }
    return genId;
  }

  async setResUserProfiles(profile: UserProfile) {
    let signedUrl = await this.uploadService.getSignedUrlS3(profile.ImageUrl,'eduvalor-users');
    let resProfile = new ResponseUserProfile();
    resProfile.id = profile.id;
    resProfile.Username = profile.Username;
    resProfile.Displayname = profile.Displayname;
    resProfile.Role = profile.Role;
    resProfile.Tel = profile.Tel;
    resProfile.Email = profile.Email;
    resProfile.Address = profile.Address;
    resProfile.BirthDate = profile.BirthDate;
    resProfile.ImageUrl = signedUrl
    resProfile.ContentCreated = profile.ContentCreated;
    return resProfile;
  }
}
