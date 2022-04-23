import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleService } from './usersRole.service';
import { UserRoleController } from './usersRole.controller';
import { UserRoleSchema } from './usersRole.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'userRoles', schema: UserRoleSchema }])],   
  controllers: [UserRoleController],
  providers: [ UserRoleService],
  exports : [ UserRoleService]
})
export class UserRoleModule {}
