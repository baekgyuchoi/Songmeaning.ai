// setIsMessageUpdating(true)

//       const reader = stream.getReader()
//       const decoder = new TextDecoder()
//       let done = false

//       while (!done) {
//         const { value, done: doneReading } = await reader.read()
//         done = doneReading
//         const chunkValue = decoder.decode(value)
//         updateMessage(id, (prev) => prev + chunkValue)
//       }


import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import { PrismaClient } from '@prisma/client'
import { songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import OpenAI from 'openai'  
import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";


async function getSongLyrics(song_id: number) {
    const Client = new Genius.Client(process.env.GENIUS_API_KEY_1);
    const SongsClient = Client.songs;
    const searchSong = await SongsClient.get(song_id)
    const lyrics = await searchSong.lyrics();
    return lyrics
}


// async function getSongMeaning(song_title: string, artist: string, lyrics: string) {
    
//     const songMeaningContext = `Song: ${song_title}\nArtist: ${artist}\nLyrics: ${lyrics}\n\nMeaning:`

//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY
//     });

//     const gptResponse = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: songMeaningContext + songMeaningPrompt }],
//         model: 'gpt-3.5-turbo',
//     })

//     return gptResponse.choices[0].message
// }

export async function POST(req: Request) {
    function min(a: number, b: number): number {
        return a < b ? a : b;
    }
    const song_info = await req.json() as SongInfo
    try {      
        const song_lyrics = await getSongLyrics(song_info.genius_id)
   
       
        const shorted_lyrics = song_lyrics.slice(0,min(song_lyrics.length - 1, 5000))
        const songMeaningContext = `Song: ${song_info.song_title}\nArtist: ${song_info.artist_name}\nLyrics: ${shorted_lyrics}\n\nMeaning:`

        const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: songMeaningContext + songMeaningPrompt }]
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
    } catch (error) {
        console.error('An error occurred:', error)
        console.log("songlyrics are null")
            const prisma = new PrismaClient();
            await prisma.$connect()

            await prisma.songs.update({
                where: {
                    song_slug: song_info.song_slug,
                },
                data: {
                    isValid: false,
                }
            })
            await prisma.$disconnect()
        return new Response('Error occurred: This song does not have lyrics', { status: 500 })
    }
}