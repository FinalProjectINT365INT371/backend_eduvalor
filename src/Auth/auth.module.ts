// import { forwardRef, Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../Users';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './strategy/jwt.strategy';



// //Jwt Module
// @Module({
//   imports: [
//     forwardRef(() => UsersModule),
//     PassportModule,
//     JwtModule.register({
//       secret: 'xxx',
//     }),
//   ],
//   providers: [AuthService, LocalStrategy ,JwtStrategy],
//   exports:[AuthService]
// })
// export class AuthModule {}
