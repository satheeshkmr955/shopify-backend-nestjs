import { z } from 'zod';

export const CreatePlaylistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  songs: z.array(z.string().min(1, 'Song name cannot be empty')).optional(),
});

export type CreatePlaylistDTO = z.infer<typeof CreatePlaylistSchema>;

export const UpdatePlaylistSchema = CreatePlaylistSchema.partial();

export type UpdatePlaylistDTO = z.infer<typeof UpdatePlaylistSchema>;
