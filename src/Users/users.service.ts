import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from './Profile/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('userProfile')
    private readonly UserProfileModel: Model<UserProfile>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}
