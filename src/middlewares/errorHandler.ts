import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Error desconocido
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};
