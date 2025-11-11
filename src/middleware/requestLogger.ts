import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { Logger } from '@map-colonies/js-logger';
import { SERVICES } from '../common/constants/services';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const logger = container.resolve<Logger>(SERVICES.LOGGER);
  
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    }, 'HTTP Request completed');
  });

  next();
}
