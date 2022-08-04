import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';
@Injectable()
export class AppService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,){}
    getHello(): string {
    //Show in console
    this.logger.error('Error...');
    this.logger.warn('Warning...');
    this.logger.info('Info...');

    //Show in console and File
    this.logger.verbose('Verbose...');
    this.logger.debug('Debug...');

    //Not Show
    this.logger.silly('Silly...');
    return 'Hello World!';
  }
}
