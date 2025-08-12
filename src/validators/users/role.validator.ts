import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequestError } from "../../errors/BadRequestError";

// 1) Schema para params.id
const roleIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^[0-9]+$/, "Role ID must be a numeric string")
      .transform((val) => parseInt(val, 10)),
  }),
});

// 2) Schemas para body ya los tienes:
//    createRoleSchema, updateRoleSchema

import {
  createRoleSchema,
  updateRoleSchema,
} from "../../schemas/role.schema";

// Middleware para validar params
export const validateRoleId = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const parsed = roleIdSchema.safeParse(req);
  if (!parsed.success) {
    throw new BadRequestError(parsed.error.errors.map(e => e.message).join("; "));
  }
  // sustituimos el id string por number
  req.params.id = String(parsed.data.params.id);
  next();
};

// Middleware para validar creación
export const validateCreateRole = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const parsed = createRoleSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new BadRequestError(parsed.error.errors.map(e => e.message).join("; "));
  }
  req.body = parsed.data;
  next();
};

// Middleware para validar edición (params + body)
export const validateUpdateRole = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // 1) id
  const p = roleIdSchema.safeParse(req);
  if (!p.success) {
    throw new BadRequestError(p.error.errors.map(e=>e.message).join("; "));
  }
  req.params.id = String(p.data.params.id);

  // 2) body
  const b = updateRoleSchema.safeParse(req.body);
  if (!b.success) {
    throw new BadRequestError(b.error.errors.map(e=>e.message).join("; "));
  }
  req.body = b.data;

  next();
};
