import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal Server Error';

    let errors: unknown[] = [];

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const res = exceptionResponse as any;

        message = res.message ?? message;

        if (Array.isArray(res.message)) {
          errors = res.message;
          message = 'Validation failed';
        }
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
      message,
      errors,
    });
  }
}