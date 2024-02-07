import { SongInfo } from "@/lib/validators/song_info";
import prisma from "@/lib/db";

//maybe POST to alter databasenext c
export async function POST(request: Request) {
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
    return new Response("Success!")
 
}
