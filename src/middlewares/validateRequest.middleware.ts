import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import { BadRequestError } from '../errors/BadRequestError';

export const validateRequest = (
  schema: ZodSchema<any>,
  source: 'body' | 'params' | 'query' = 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      throw new BadRequestError(
        JSON.stringify(result.error.flatten().fieldErrors)
      );
    }

    req[source] = result.data;
    next();
  };
};
