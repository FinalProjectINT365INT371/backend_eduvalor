import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from './profile.schema';
import { Model } from 'mongoose';
import { CreateUserProfile } from './dto/profile.dto';
import { Logger } from 'winston';
import { UploadService } from 'src/Upload/upload.service';
import bcrypt from 'bcrypt';
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

  async createByFB(req :any) : Promise<any>{
    let file = [];
    let createUser = new CreateUserProfile;
    let findUser = await this.findByPSID(req.user.psid);
    console.log(findUser); 
    if(findUser == null){
      createUser.Email = req.user.email;
      createUser.Firstname = req.user.firstName;
      createUser.Lastname = req.user.lastName;
      createUser.PSID = req.user.psid;
      createUser.DeleteFlag = false;
      console.log(createUser);   
      let user = await this.create(createUser, file);
    }
  }

  async create(
    CreateUserProfile: CreateUserProfile,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ): Promise<UserProfile> {
    const bcrypt = require('bcrypt');
    const createdUser = new this.UserProfileModel(CreateUserProfile);
    const genId = await this.generateNewId();
    this.logger.debug(`Function : Create User - ${genId}`);
    createdUser._id = genId;
    if (createdUser.Password != null) {
      const passwordChange = await bcrypt.hash(createdUser.Password, 10);
      createdUser.Password = passwordChange;
    }
    createdUser.CreateDate = new Date().toLocaleString();
    createdUser.UpdateDate = new Date().toLocaleString();
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
    return createdUser;
  }

  async generateNewId() {
    let lastUser = await this.UserProfileModel.find()
      .sort({ $natural: -1 })
      .limit(1);
    let lastId = parseInt(lastUser[0]._id.toString().split('_')[1]);
    let genId = 'U_' + (lastId + 1);
    return genId;
  }
}
