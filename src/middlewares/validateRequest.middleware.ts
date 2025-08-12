import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import { BadRequestError } from '../errors/BadRequestError';


export const validateRequest = (
  schema: ZodSchema<any>,
  source: 'body' | 'params' | 'query' = 'body'
): RequestHandler => {
  return (req, res, next) => {
    console.log("📥 Validando", source, req[source]); // 🧪 AGREGADO

    const result = schema.safeParse(req[source]);

    if (!result.success) {
      console.log("❌ Validación falló", result.error.flatten().fieldErrors); // 🧪 AGREGADO
      throw new BadRequestError(
        JSON.stringify(result.error.flatten().fieldErrors)
      );
    }

    req[source] = result.data;
    console.log("✅ Validación OK", req[source]); // 🧪 AGREGADO
    next();
  };
};
