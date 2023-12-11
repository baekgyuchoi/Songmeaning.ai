
import { PrismaClient } from '@prisma/client'

import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";
import { SongData } from "@/lib/validators/song_data_response";
import { songs_faq_prompts } from '@/app/helpers/constants/songs-faq-prompt';





export const maxDuration = 300 

export async function POST(req: Request) {
    const request = await req.json()
    const song_data = request.song_data as SongData
    const faq_index = request.faq_index as number
    const song_meaning = song_data.song_meaning?.meaning
    const song_lyrics = song_data.lyrics

    const prompt = songs_faq_prompts[faq_index][0]
    
    let FAQContext = ""
    if (faq_index == 0) {
        FAQContext = `Song: ${song_data.song_title}\nArtist: ${song_data.artist_name}\nLyrics: ${song_lyrics}\n\nMeaning: ${song_meaning} \n\n`
    }
    if (faq_index == 1) {
        FAQContext = `Song:${song_data.song_short_title}\n Artist: ${song_data.artist_name}\nLyrics: ${song_lyrics}\n\n`
    }
    if (faq_index == 2) {
        FAQContext = `Song: ${song_data.song_title}\nArtist: ${song_data.artist_name} Two Words: ${song_data.two_word_description}\n\n`
    }
    if (faq_index == 3) {
        FAQContext = `Song: ${song_data.song_title}\nArtist: ${song_data.artist_name}\nLyrics: ${song_lyrics}\n\nMeaning: ${song_meaning} \n\n`
    }


    const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: "Within 400 words, answer the following prompt: \n" + FAQContext +prompt }]
    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserInput ? 'user' : 'system',
        content: message.text,
    }))

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.8,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 2000,
        stream: true,
        n: 1,
    }  
    

    const stream = await OpenAIStream(payload)
    
    return new Response(stream)
    
}