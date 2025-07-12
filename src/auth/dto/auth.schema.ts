import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Please enter valid email')
    .min(1, 'Please enter email'),
  password: z.string().min(1, 'Please enter password'),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
