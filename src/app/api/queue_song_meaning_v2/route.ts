import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import prisma from "@/lib/db";
import { songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";
import { getEncoding } from "js-tiktoken";


function Get_Token_Length(input:string) {
    const encoding = getEncoding("cl100k_base");
    const tokens = encoding.encode(input);
    return tokens.length
    
}

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
export const maxDuration = 300 

export async function POST(req: Request) {
    function min(a: number, b: number): number {
        return a < b ? a : b;
    }
    const song_info = await req.json() as SongInfo
    try {      
        const song_lyrics = await getSongLyrics(song_info.genius_id)

        await prisma.songs.update({
            where: {
                song_slug: song_info.song_slug,
            },
            data: {
                lyrics: song_lyrics,

            }
        })
        
        let shorted_lyrics = song_lyrics.slice(0,min(song_lyrics.length - 1, 3000))
        while (Get_Token_Length(shorted_lyrics) > 1500) {
            shorted_lyrics = shorted_lyrics.slice(0,shorted_lyrics.length/2)
        }
   
        const songMeaningContext = `Song: ${song_info.song_title}\nArtist: ${song_info.artist_name}\nLyrics: ${shorted_lyrics}\n\nMeaning:`

        const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: songMeaningContext + songMeaningPrompt }]
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
    } catch (error) {
        console.error('An error occurred:', error)
        console.log("songlyrics are null")
            await prisma.songs.update({
                where: {
                    song_slug: song_info.song_slug,
                },
                data: {
                    isValid: false,
                }
            })
        return new Response('Error occurred: This song does not have lyrics', { status: 500 })
    }
}