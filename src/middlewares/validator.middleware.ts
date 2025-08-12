import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { BadRequestError } from "../errors/BadRequestError";

/**
 * Recibe un schema de Zod y devuelve un middleware de Express
 * que valida req.body contra ese schema.
 */
export const createValidator = <T>(schema: ZodSchema<T>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // Opcional: formatea errores para envío al cliente
      const message = result.error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");
      throw new BadRequestError(`Datos inválidos: ${message}`);
    }
    // Sobrescribimos req.body con la data validada y tipada
    req.body = result.data;
    next();
  };
};
