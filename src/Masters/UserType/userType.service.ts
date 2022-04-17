import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './userType.schema';
import { Model } from 'mongoose';
import { CreateVideoDto } from './dto/usersType.dto';

@Injectable()
export class UserTypeService {
  constructor(@InjectModel('videos') private readonly videoModel: Model<Video>) { } 
  getHello(): string {
    return 'Hello World!';
  }

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = new this.videoModel(createVideoDto);
    return await createdVideo.save();
  }
}
