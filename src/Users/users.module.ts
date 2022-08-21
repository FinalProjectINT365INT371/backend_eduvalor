 import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileSchema } from './Profile/profile.schema';
import { UsersController } from './users.controller';
import { UsersProfileService } from './Profile/profile.service';
import { UsersService } from './users.service';
import { UploadModule } from 'src/Upload/upload.module';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'userProfile', schema: UserProfileSchema },
    ]),
    UploadModule,
  ],
  controllers: [UsersController],
  providers: [UsersProfileService, UsersService],
  exports: [UsersProfileService, UsersService],
})
export class UsersModule {}
