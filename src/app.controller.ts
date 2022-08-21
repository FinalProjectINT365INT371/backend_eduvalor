import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginAuthGuard } from './Auth/guard/login-auth.guard';
import { AuthService } from './auth/auth.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
