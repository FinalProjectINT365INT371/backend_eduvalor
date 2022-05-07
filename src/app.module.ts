import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserRoleModule} from './Masters/UserType/usersRole.module';
import { ContentModule } from './Contents/content.module';
import { MinioClientModule } from './Upload/minio-client/minio-client.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true,})
            ,MongooseModule.forRoot(process.env.DATABASE_URL)
            ,UserRoleModule,ContentModule,MinioClientModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
