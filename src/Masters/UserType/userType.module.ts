import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTypeService } from './userType.service';
import { UserTypeController } from './userType.controller';
import { VideoSchema } from './userType.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'videos', schema: VideoSchema }])],   
  controllers: [UserTypeController],
  providers: [UserTypeService],
  exports : [UserTypeService]
})
export class UserTypeModule {}
