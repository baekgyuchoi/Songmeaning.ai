import {z} from 'zod'

export const SongInfoSchema = z.object({
    song_title: z.string(),
    genius_url: z.string(),
    song_slug: z.string(),
    genius_id: z.string(),
    artist_name: z.string(),
    artist_slug: z.string(),
    has_meaning: z.boolean(),
})

//array of messages validator
export const SongInfoArraySchema = z.array(SongInfoSchema)

export type SongInfo = z.infer<typeof SongInfoSchema>