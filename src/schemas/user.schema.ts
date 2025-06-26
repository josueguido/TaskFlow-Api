import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().min(0),
});

export function validateUser(req: { body: any }, res: { status: (code: number) => { json: (body: any) => void } }) {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.format());
  }
}
