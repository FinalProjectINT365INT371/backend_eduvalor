import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LoginStrategy } from './strategy/login.strategy';
import { UsersModule } from '../Users/users.module';
import { AppModule } from 'src/app.module';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, JwtStrategy, LoginStrategy,FacebookStrategy,GoogleStrategy],
  exports: [AuthService],
  controllers:[AuthController]
})
export class AuthModule {}
