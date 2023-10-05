import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseAppException, NotFoundException } from './exception';

@Catch(BaseAppException)
export class AppExceptionHandler implements ExceptionFilter {
  catch(exception: BaseAppException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.BAD_GATEWAY;
    const message = exception instanceof BaseAppException ? exception.message : 'Something went wrong!';
    
    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
      });
  }
}