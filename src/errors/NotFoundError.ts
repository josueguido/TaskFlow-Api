import { CustomError } from "./AppError";

const notFoundError = (message: string = 'Not Found') => {
  class NotFoundError extends CustomError {
    constructor() {
      super(message, 404);
      this.name = 'NotFoundError';
      Error.captureStackTrace(this, this.constructor);
    }
  }
  return new NotFoundError();
}