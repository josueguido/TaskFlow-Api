import { z } from "zod";

export const taskParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive()),
});

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status_id: z.string().min(1),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status_id: z.string().min(1).optional(),
});

export const changeStatusSchema = z.object({
  statusId: z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive()),
});

export const assignUsersSchema = z.object({
  userIds: z.array(z.string().transform((val) => parseInt(val, 10)).pipe(z.number().int().positive())).nonempty(),
});
