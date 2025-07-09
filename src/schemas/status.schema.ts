import { z } from "zod";

export const createStatusSchema = z.object({
  name: z.string().min(1, "Name is required"),
  order: z.number().int().min(0, "Order must be a non-negative integer"),
});

export const updateStatusSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  order: z.number().int().min(0, "Order must be a non-negative integer").optional(),
});

export const statusIdSchema = z.object({
  id: z.string().uuid("Invalid status ID format"),
});
