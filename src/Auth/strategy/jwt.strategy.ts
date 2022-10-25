import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersProfileService } from '../../Users/Profile/profile.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Logger } from 'winston';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private UsersProfileService: UsersProfileService,
    @Inject('winston') private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    this.logger.debug('Function : Validate JWT Token');
    const user = await this.UsersProfileService.findById(payload.id);
    console.log(user);

    return {
      user_id: user._id,
      name: user.Displayname,
      email: user.Email,
      role: user.Role,
    };
  }
}
