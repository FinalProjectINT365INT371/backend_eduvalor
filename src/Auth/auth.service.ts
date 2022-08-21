import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'winston';
import { UsersProfileService } from '../Users/Profile/profile.service';
@Injectable()
export class AuthService {
  constructor(
    private userProfileService: UsersProfileService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('validate-authservice');
    const user = await this.userProfileService.findByUsername(username);
    const bcrypt = require('bcrypt');
    const passwordChange = await bcrypt.hash(password, 10);
    console.log(passwordChange);
    console.log(user.Password);
    console.log(await bcrypt.compare(password, user.Password));

    if (user && (await bcrypt.compare(password, user.Password))) {
      const { Password, Username, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const Access_Token = await this.generateAccessToken(user);
    return {
      access_token: Access_Token,
    };
  }
  async generateAccessToken(user: any): Promise<string> {
    const payloadAccessToken = {
      id: user._id,
      Role: user.Role,
    };

    const access_token = await this.jwtService.signAsync(payloadAccessToken, {
      expiresIn: process.env.EXPIREDATETOKEN,
    });

    return access_token;
  }
}
