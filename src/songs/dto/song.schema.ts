import { z } from 'zod';

export const CreateSongSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artists: z
    .array(z.string().min(1, 'Artist name cannot be empty'))
    .nonempty('At least one artist is required'),
  releasedDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format (expected YYYY-MM-DD)',
  }),
  duration: z.number().gt(0),
  lyrics: z.string().min(1, 'Lyrics is required'),
});

export type CreateSongDTO = z.infer<typeof CreateSongSchema>;

export const UpdateSongSchema = CreateSongSchema.partial();

export type UpdateSongDTO = z.infer<typeof UpdateSongSchema>;
