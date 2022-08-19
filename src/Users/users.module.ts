import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './Profile/profile.schema';
import { UsersController } from './users.controller';
import { UsersProfileService } from './Profile/profile.service';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'userProfile', schema: UserProfileSchema }])],   
  controllers: [UsersController],
  providers: [ UsersProfileService,UsersService],
  exports : [ UsersProfileService,UsersService]
})
export class UserModule {}
