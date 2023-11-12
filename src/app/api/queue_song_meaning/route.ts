import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import { PrismaClient } from '@prisma/client'
import { songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { ChatGPTMessage, OpenAIStream } from "@/lib/openai-stream";
import { OpenAIStreamPayload } from "@/lib/openai-stream";



const prisma = new PrismaClient()

const genius_api_key = process.env.GENIUS_API_KEY_1



async function getSongLyrics(song_id: number) {
    const Client = new Genius.Client(genius_api_key);
    const SongsClient = Client.songs;
    const searchSong = await SongsClient.get(song_id)
    const lyrics = await searchSong.lyrics();
    return lyrics
}

async function getSongMeaning(song_title: string, artist: string, lyrics: string) {

    const songMeaningContext = `Song: ${song_title}\nArtist: ${artist}\nLyrics: ${lyrics}\n\nMeaning:`

    const outboundMessages: ChatGPTMessage[] = [{
        role: 'user',
        content: songMeaningContext,
    }];

    outboundMessages.unshift({
        role: 'system',
        content: songMeaningPrompt,
    })

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.8,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: false,
        n: 1,
    }
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
    })
    const json = await res.json()
    return json.choices[0].text
}
//maybe POST to alter databasenext c
export async function POST(request: Request) {
    const song_info = await request.json() as SongInfo
    // query if song_id exists in database or use song_slug instead

    const db_song = await prisma.songs.findUnique({
        where: {
            song_slug: song_info.song_slug,
        },
        include: {
            song_meaning: true
        }
    })

    if (db_song != null) {
        if (db_song.lyrics != null) {
            const lyrics = db_song.lyrics
        }
        db_song.song_meaning
    }


    const lyrics = await getSongLyrics(song_info.genius_id)


    // if (db_song?.lyrics === null) {
    //     await prisma.songs.update({
    //         where: {
    //             song_slug: song_info.song_slug,
    //         },
    //         data: {
    //             lyrics: lyrics
    //         }
    //     })
    // }

    await prisma.songs.create({
        data: {
            song_title: song_info.song_title,
            song_slug: song_info.song_slug,
            genius_id: song_info.genius_id,
            artist_name: song_info.artist_name,
            artist_slug: song_info.artist_slug,
            genius_url: song_info.genius_url,
            lyrics: lyrics
        }
    })
    const song_meaning = await getSongMeaning(song_info.song_title, song_info.artist_name, lyrics)

    await prisma.songMeaning.create({
        data: {
            meaning: song_meaning,
            createdAt: new Date(),
            song: {
                connect: {
                    song_slug: song_info.song_slug
                }
            }
        }
    })

    await prisma.$disconnect()

    return new Response(lyrics)
}




// async function updateLyrics(songInfo: SongInfo) {
//     const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
//     const search = await Client.songs.get(songInfo.genius_id);
//     const lyrics = await search[0].lyrics();
// }   