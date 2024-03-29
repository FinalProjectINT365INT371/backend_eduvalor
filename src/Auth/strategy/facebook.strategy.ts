import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { UsersProfileService } from '../../Users/Profile/profile.service';
import { Logger } from 'winston';
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private UsersProfileService: UsersProfileService,
    @Inject('winston') private readonly logger: Logger,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALL_BACK_URL,
      scope: 'email',
      profileFields: ['emails', 'name', 'id'],
    });
  }

  async validate(
    accessTokenFacebook: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    this.logger.debug('Function : Validate Facebook User');
    const { name, emails, id } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      psid: id,
    };
    this.logger.debug('Assign Facebook Token');
    const payload = {
      user,
      accessTokenFacebook,
    };

    done(null, payload);
  }
}
