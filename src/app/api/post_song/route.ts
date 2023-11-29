
import { SongInfo } from "@/lib/validators/song_info";
import { PrismaClient } from '@prisma/client'

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
        await prisma.$disconnect()
        if (song_in_db.isValid === false) {
            return new Response("Error - song is invalid")
        }
        return new Response("Error - song already exists")
    }
    console.log(song_info)
    const song_title = song_info.song_short_title + " by " + song_info.artist_name
    await prisma.songs.create({
        data: {
            song_slug: song_info.song_slug,
            artist_name: song_info.artist_name,
            song_title: song_title,
            genius_id: song_info.genius_id,
            artist_id: song_info.artist_id,
            artist_slug: song_info.artist_slug,
            genius_url: song_info.genius_url,
            song_short_title: song_info.song_short_title,
            header_image_url: song_info.header_image_url,
            song_image_url: song_info.song_art_url,
            release_date: song_info.release_date,
        }
    })
    await prisma.$disconnect()
    return new Response("Success!")
 
}




// async function updateLyrics(songInfo: SongInfo) {
//     const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
//     const search = await Client.songs.get(songInfo.genius_id);
//     const lyrics = await search[0].lyrics();
// }   