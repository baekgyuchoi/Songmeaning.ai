

import {z} from 'zod'

export const SongMeaningSchema = z.object({
    id: z.number(),
    slug: z.string(),
    meaning: z.string(),
    meaning_v2: z.string().optional(),
    meaning_v1: z.string().optional(),
    createdAt:z.date()
})



//array of messages validator
export const SongInfoArraySchema = z.array(SongMeaningSchema)

export type SongMeaning = z.infer<typeof SongMeaningSchema>