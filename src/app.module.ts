import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserRoleModule} from './Masters/UserType/usersRole.module';
import { ContentModule } from './Contents/content.module';
import { UploadModule } from './Upload/upload.module';
import { config } from 'aws-sdk';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:process.env.AWS_REGION,
})
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true,})
            ,MongooseModule.forRoot(process.env.DATABASE_URL)
            ,UserRoleModule,ContentModule,UploadModule,
            
            WinstonModule.forRoot({
              format: winston.format.combine(
                winston.format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json(),
              ),
              transports: [
                new winston.transports.Console({
                  level: 'info',
                  format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf(
                      info => `${info.timestamp} ${info.level}: ${info.message}`
                    )
                  )
                }),
                new winston.transports.DailyRotateFile({
                  level: 'debug',
                  dirname:'./log/',
                  filename: 'debug.log-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                }),
                // new winston.transports.File({
                //   dirname: './log/info/',
                //   filename: 'info.log',
                //   level: 'info',
                // }),
              ],
            }),
        ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
