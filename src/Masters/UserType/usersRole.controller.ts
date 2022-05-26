import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserRole } from './dto/usersRole.dto';
import { UserRoleService } from './usersRole.service';

@Controller('userRole')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  getAll() {
    return this.userRoleService.findAll();
  }

  @Get('getRolebyId')
  async getById(@Query('id') id: string) {
    return await this.userRoleService.findById(id);
  }

  @Post('addRole')
  async create(@Body() createUserRole: CreateUserRole) {
    return await this.userRoleService.create(createUserRole);
  }

  @Put('updateRole')
  async update(
    @Query('id') id: string,
    @Body() updateUserRole: CreateUserRole,
  ) {
    return await this.userRoleService.update(id, updateUserRole);
  }

  @Delete('deleteUserRole')
  async removeById(@Query('id') id: string) {
    return this.userRoleService.removeById(id);
  }
}
