import { Controller, Get } from '@nestjs/common';
import { UserTypeService } from './userType.service';

@Controller()
export class UserTypeController {
  constructor(private readonly usertypeService: UserTypeService) {}

  @Get()
  getHello(): string {
    return this.usertypeService.getHello();
  }
}
