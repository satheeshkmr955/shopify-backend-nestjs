import { z } from 'zod';

export const CreateUserSchema = z.object({
  firstName: z.string().min(1, 'First name cannot be empty'),
  lastName: z.string().min(1, 'Last name cannot be empty'),
  email: z.string().email('Please enter valid email'),
  password: z
    .string()
    .min(8, 'Password cannot be less than 8 chars')
    .max(15, 'Password cannot be greater than 15 chars'),
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial()
  .omit({
    email: true,
  })
  .extend({
    playlists: z
      .array(z.string().min(1, 'Playlist cannot be empty'))
      .optional(),
  });

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
