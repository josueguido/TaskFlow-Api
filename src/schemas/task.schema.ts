import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.string().min(1),
  assignedTo: z.array(z.string()).nonempty(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.string().min(1).optional(),
  assignedTo: z.array(z.string()).optional(),
});

export const changeStatusSchema = z.object({
  statusId: z.string().uuid(),
});

export const assignUsersSchema = z.object({
  userIds: z.array(z.string().uuid()).nonempty(),
});
