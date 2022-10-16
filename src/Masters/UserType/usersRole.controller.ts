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
  UseGuards,
} from '@nestjs/common';
import { CreateUserRole } from './dto/usersRole.dto';
import { UserRoleService } from './usersRole.service';
import { Roles } from 'src/Authorization/roles.decorator';
import { ROLES } from 'src/Authorization/ROLES';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { JwtAuthGuard } from 'src/Auth/guard/jwt-auth.guard';

@Controller('userRole')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Get()
  getAll() {
    return this.userRoleService.findAll();
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Get('getRolebyId')
  async getById(@Query('id') id: string) {
    return await this.userRoleService.findById(id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Post('addRole')
  async create(@Body() createUserRole: CreateUserRole) {
    return await this.userRoleService.create(createUserRole);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Put('updateRole')
  async update(
    @Query('id') id: string,
    @Body() updateUserRole: CreateUserRole,
  ) {
    return await this.userRoleService.update(id, updateUserRole);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('roles', ROLES.DEVELOPER)
  @Delete('deleteUserRole')
  async removeById(@Query('id') id: string) {
    return this.userRoleService.removeById(id);
  }
}
