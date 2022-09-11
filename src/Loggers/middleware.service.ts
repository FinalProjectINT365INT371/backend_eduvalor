import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(
  @Inject('winston')
  private readonly loggerwin: Logger,) {}
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl} = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log( `${method} ${originalUrl} : ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
      this.loggerwin.debug(`${method} ${originalUrl} : ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
    });
    next();
  }
}