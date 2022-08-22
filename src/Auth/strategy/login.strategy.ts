import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Logger } from 'winston';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private authService: AuthService,
    @Inject('winston')
    private readonly logger: Logger,) {
    super();
  }
   async validate(username: string, password: string): Promise<any> {
     this.logger.debug('Function : Login');
     const user = await this.authService.validateUser(username, password);
     if (!user) {
       throw new UnauthorizedException();
     }
     return user;
   }
}
