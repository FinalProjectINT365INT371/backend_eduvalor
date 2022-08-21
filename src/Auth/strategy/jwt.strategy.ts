import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersProfileService } from '../../Users/Profile/profile.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private UsersProfileService: UsersProfileService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.UsersProfileService.findById(payload.id);
    console.log(user);
    
    return {
      user_id: user._id,
      name: user.Firstname,
      email: user.Email,
      role: user.Role,
    };
  }


}
