import {z} from 'zod'

export const ArtistSchema = z.object({

    artist_slug: z.string(),
    name: z.string(),
    genius_id: z.number(),
    edited_date: z.date()
})

//array of messages validator
export const ArtistArraySchema = z.array(ArtistSchema)

export type Artist = z.infer<typeof ArtistSchema>