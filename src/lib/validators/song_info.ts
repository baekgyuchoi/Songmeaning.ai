import {z} from 'zod'

export const SongInfoSchema = z.object({
    song_title: z.string(),
    genius_url: z.string(),
    song_slug: z.string(),
    genius_id: z.number(),
    artist_name: z.string(),
    artist_slug: z.string(),
})

//array of messages validator
export const SongInfoArraySchema = z.array(SongInfoSchema)

export type SongInfo = z.infer<typeof SongInfoSchema>