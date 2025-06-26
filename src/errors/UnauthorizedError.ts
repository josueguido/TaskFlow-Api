import { CustomError } from '../errors/AppError';

class UnauthorizedError extends CustomError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
    Error.captureStackTrace(this, this.constructor);
  }
}