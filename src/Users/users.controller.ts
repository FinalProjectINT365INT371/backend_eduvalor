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
  import { UsersProfileService } from './Profile/profile.service';
  
  @Controller('user')
  export class UsersController {
    constructor(private readonly UsersProfileService: UsersProfileService) {}
  
    @Get()
    getAll() {
      return this.UsersProfileService.getHello();
    }
}