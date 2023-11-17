import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import { PrismaClient } from '@prisma/client'
import { songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import OpenAI from 'openai'  





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

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const gptResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: songMeaningContext + songMeaningPrompt }],
        model: 'gpt-3.5-turbo',
    })

    return gptResponse.choices[0].message
}
//maybe POST to alter databasenext c
export async function POST(request: Request) {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const song_info = await request.json() as SongInfo
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database
    const song_in_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_info.song_slug,
            },
        })
    if (song_in_db != null) {
        if (song_in_db.isValid === false) {
            return new Response("Error - song is invalid")
        }
        return new Response("Error - song already exists")
    }
   



    // lyrics isValid logic
  
    const lyrics = await getSongLyrics(song_info.genius_id)
    if (lyrics != null) {
        
        const song_meaning = await getSongMeaning(song_info.song_title, song_info.artist_name, lyrics)
        
        
        await prisma.songs.create({
            data: {
                song_title: song_info.song_title,
                song_slug: song_info.song_slug,
                genius_id: song_info.genius_id,
                artist_name: song_info.artist_name,
                artist_slug: song_info.artist_slug,
                genius_url: song_info.genius_url,
                lyrics: lyrics,
                isValid: true
            }
        }).then( async () => {
            console.log("song created")
            if (song_meaning.content != null) {
                console.log("songmeaning isn't null")
                const song_meaning_text = song_meaning.content
                

                await prisma.songMeaning.create({
                    data: {
                        meaning: song_meaning_text,
                        song: {
                            connect: {
                                song_slug: song_info.song_slug
                            }
                        }
                    }
            })
            await prisma.$disconnect()
            return new Response("songmeaning success")
            }else {
                    await prisma.$disconnect()
                    return new Response("songmeaning failed")
        }
        }
        )

    } else {
        await prisma.songs.create({
            data: {
                song_title: song_info.song_title,
                song_slug: song_info.song_slug,
                genius_id: song_info.genius_id,
                artist_name: song_info.artist_name,
                artist_slug: song_info.artist_slug,
                genius_url: song_info.genius_url,
                isValid: false
            }
        })
        await prisma.$disconnect()
        return new Response("song does not have valid lyrics")
    }
    return new Response("success")
}




// async function updateLyrics(songInfo: SongInfo) {
//     const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
//     const search = await Client.songs.get(songInfo.genius_id);
//     const lyrics = await search[0].lyrics();
// }   