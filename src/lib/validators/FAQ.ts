import {z} from 'zod'

export const FAQSchema = z.object({
    song_slug: z.string(),
    question: z.string(),
    answer: z.string(),
    faq_slug: z.string(),
    prompt: z.string(),
})

//array of messages validator
export const SongInfoArraySchema = z.array(FAQSchema)

export type FAQ = z.infer<typeof FAQSchema>