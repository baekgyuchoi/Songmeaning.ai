import { PrismaClient } from '@prisma/client'

//maybe POST to alter databasenext c
export async function POST(request: Request) {
    
    const song_meaning = await request.json() 
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database
    const prisma = new PrismaClient()
    await prisma.$connect()
    const song_in_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_meaning.song_slug,
            },
        })
    if (song_in_db == null) {

        await prisma.$disconnect()
        console.log("Error - song does not exist")
        return new Response("Error - song does not exist")
    }
    await prisma.songMeaning.create({
        data: {
            meaning: song_meaning.meaning,
            createdAt: new Date(),
            song: {
                connect: {
                    song_slug: song_meaning.song_slug
                }
            }
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