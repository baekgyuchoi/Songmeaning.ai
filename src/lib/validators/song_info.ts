import {z} from 'zod'

export const SongInfoSchema = z.object({
    song_short_title: z.string(),
    song_title: z.string(),
    genius_url: z.string(),
    song_slug: z.string(),
    genius_id: z.number(),
    artist_name: z.string(),
    artist_id: z.number(),
    artist_slug: z.string(),
    header_image_url: z.string().optional(),
    song_art_url: z.string().optional(),
    release_date: z.string().optional(),
})

//array of messages validator
export const SongInfoArraySchema = z.array(SongInfoSchema)

export type SongInfo = z.infer<typeof SongInfoSchema>