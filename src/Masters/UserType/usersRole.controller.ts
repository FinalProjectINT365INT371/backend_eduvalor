import { Body, Controller, Get, NotAcceptableException, Param, Post } from '@nestjs/common';
import { CreateUserRole } from './dto/usersRole.dto';
import { UserRoleService } from './usersRole.service';

@Controller("userRole")
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  getAll() {
    return this.userRoleService.findAll();
  }

  @Get()
  getById(@Param() id:string) {
    return this.userRoleService.findById(id);
  }

  @Post('adduser')
  async create(@Body() createUserRole: CreateUserRole) {
    try {

      await this.userRoleService.create(createUserRole);

    } catch (error) {
      return `Have error : ${error}`;
    }
  }
}
