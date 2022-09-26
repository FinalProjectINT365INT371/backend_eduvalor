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
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    this.logger.debug('Validate-authservice');
    const user = await this.userProfileService.findByUsername(username);
    const bcrypt = require('bcrypt');
    const passwordChange = await bcrypt.hash(password, 10);
    this.logger.debug('Bcrypt password');
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
    this.logger.debug('Generate access_token');
    const payloadAccessToken = {
      id: user._id,
      Role: user.Role,
    };

    const access_token = await this.jwtService.signAsync(payloadAccessToken, {
      expiresIn: process.env.EXPIREDATETOKEN,
    });

    return access_token;
  }

  async sendEmailToUser(username: string): Promise<any> {
    var nodemailer = require('nodemailer');
    const user = await this.userProfileService.findByUsername(username);
    if (user.Email != null) {
      var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      var mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'worawit.4516@mail.kmutt.ac.th',
        //to: user.Email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  }
}
