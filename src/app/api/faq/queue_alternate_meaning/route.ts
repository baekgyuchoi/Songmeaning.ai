
import { PrismaClient } from '@prisma/client'

import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";
import { SongData } from "@/lib/validators/song_data_response";





export const maxDuration = 300 

export async function POST(req: Request) {
    const song_data = await req.json() as SongData
    const song_meaning = song_data.song_meaning?.meaning
    const song_lyrics = song_data.lyrics

    if (song_lyrics == null) {
        return new Response("Error - song lyrics not found")
    }
    
    const prisma = new PrismaClient();
    await prisma.$connect()

    await prisma.songs.update({
        where: {
            song_slug: song_data.song_slug,
        },
        data: {
            lyrics: song_lyrics,

        }
    })
    await prisma.$disconnect()
    
    
    const songMeaningContext = `Song: ${song_data.song_title}\nArtist: ${song_data.artist_name}\n`
    const songMeaningPrompt = `given the song meaning and lyrics above, give an alternate meaning for the song that is qualitatively different from the given song meaning. Give a summary analysis paragraph (of how this alternate meaning is different), emotional journey paragraph (delve into a different take from the song meaning given above on an emotional journey this song can take the audience on), quote analysis (pull quotes as evidence to back up your alternate meaning), and conclusion (concluding upon the alternate meaning's outlook and insights gained) :\n\n`


    const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: "Within 400 words, answer the following prompt: \n" + songMeaningContext + songMeaningPrompt  }]
    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserInput ? 'user' : 'system',
        content: message.text,
    }))

    const payload: OpenAIStreamPayload = {
        model: 'ft:gpt-3.5-turbo-1106:personal::8TTC6hNk',
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