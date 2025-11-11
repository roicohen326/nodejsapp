import { Request, Response, NextFunction } from 'express';
import { Logger } from '@map-colonies/js-logger';
import { container } from 'tsyringe';
import { SERVICES } from '../common/constants/services';
import { NOT_FOUND, CONFLICT, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../common/constants/httpStatus';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction): void {
  const logger = container.resolve<Logger>(SERVICES.LOGGER);

  logger.error({
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  }, 'Request error occurred');

  if (error.name === 'NotFoundError') {
    res.status(NOT_FOUND).json({
      error: 'Not Found',
      message: error.message
    });
    return;
  }

  if (error.name === 'ConflictError') {
    res.status(CONFLICT).json({
      error: 'Conflict',
      message: error.message
    });
    return;
  }

  if (error.name === 'BadRequestError') {
    res.status(BAD_REQUEST).json({
      error: 'Bad Request',
      message: error.message
    });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
}
