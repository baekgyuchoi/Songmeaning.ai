// const song_data: ({
//     song_meaning: {
//         id: number;
//         slug: string;
//         meaning: string;
//         createdAt: Date;
//     } | null;
// } & {
//     id: number;
//     isValid: boolean;
//     song_title: string;
//     song_slug: string;
//     artist_name: string;
//     artist_slug: string;
//     genius_url: string;
//     genius_id: number;
//     lyrics: string | null;
// }) | null

import {z} from 'zod'

export const SongDataSchema = z.object({
    id: z.number(),
    song_title: z.string(),
    genius_url: z.string(),
    song_slug: z.string(),
    genius_id: z.number(),
    artist_name: z.string(),
    artist_id: z.number(),
    artist_slug: z.string(),
    isValid: z.boolean(),
    lyrics: z.union([z.string(),z.null()]),
    song_image_url: z.string().optional(),
    header_image_url: z.string().optional(),
    song_short_title: z.string(),
    release_date: z.string().optional(),
    two_word_description: z.string(),
    badges: z.array(z.object({})),
    song_meaning: z.union([z.object({
        id: z.number(),
        slug: z.string(),
        meaning: z.string(),
        flagged: z.boolean(),
        createdAt:z.date()
    }), z.null()]),
    song_meaning_preview: z.union([z.object({
        id: z.number(),
        slug: z.string(),
        meaning: z.string(),
        flagged: z.boolean(),
        createdAt:z.date()
    }), z.null()])
    


})

//array of messages validator
export const SongInfoArraySchema = z.array(SongDataSchema)

export type SongData = z.infer<typeof SongDataSchema>