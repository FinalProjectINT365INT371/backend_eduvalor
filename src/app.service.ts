import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';
@Injectable()
export class AppService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,){}
    getHello(): string {
    this.logger.error('Error...');
    this.logger.warn('Warning...');
    this.logger.info('Info...');
    this.logger.verbose('Verbose...');
    this.logger.debug('Debug...');
    this.logger.silly('Silly...');
    return 'Hello World!';
  }
}
