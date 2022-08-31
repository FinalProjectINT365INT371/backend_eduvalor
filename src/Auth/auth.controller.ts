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
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ROLES } from 'src/Authorization/ROLES';
import { Roles } from 'src/Authorization/roles.decorator';
import { RolesGuard } from 'src/Authorization/roles.guard';
import { CreateUserProfile } from 'src/Users/Profile/dto/profile.dto';
import { UsersProfileService } from 'src/Users/Profile/profile.service';
import { Logger } from 'winston';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './guard/facebook-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { firstValueFrom } from 'rxjs';
import { GoogleAuthGuard } from './guard/google-auth.guard';
@Controller('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersProfileService: UsersProfileService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  public login(@Request() req): any {
    console.log(req.user._doc);
    return this.authService.login(req.user._doc);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async GetUser(@Request() req): Promise<any> {
    const user = await this.usersProfileService.findById(req.user.user_id);
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('roles', ROLES.DEVELOPER)
  @Get('role')
  async GetRole(@Request() req): Promise<any> {
    return 'Your Developer !!';
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req): Promise<any> {
    let user = await this.usersProfileService.createByFB(req.user);
    let access_token = await this.authService.login(user);
    return {
      statusCode: HttpStatus.OK,
      facebookData: req.user,
      accessTokenApp: access_token,
      userApp: user,
    };
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req) {
    if (!req.user) {
      return 'No user from google';
    }
    let user = await this.usersProfileService.createByGoogle(req.user);
    let access_token = await this.authService.login(user);
    return {
      statusCode: HttpStatus.OK,
      googleData: req.user,
      accessTokenApp: access_token,
      userApp: user,
    };
  }
}
