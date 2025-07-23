import { z } from "zod";

export const taskHistorySchema = z.object({
  id: z.number().int().positive(),
  task_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  field_changed: z.string().min(1),
  old_value: z.string().nullable(), // puede ser null o string
  new_value: z.string().nullable(),
  changed_at: z.string().datetime(),
});

// Si llegaras a crear registros manualmente (opcional)
export const createTaskHistorySchema = z.object({
  task_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  field_changed: z.string().min(1),
  old_value: z.string().nullable().optional(),
  new_value: z.string().nullable().optional(),
});
