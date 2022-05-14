import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
