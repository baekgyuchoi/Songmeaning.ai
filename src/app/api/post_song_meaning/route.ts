import prisma from '@/lib/db'

//maybe POST to alter databasenext c
export async function POST(request: Request) {
    
    const song_meaning = await request.json() 
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database

    const song_in_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_meaning.song_slug,
            },
        })
    if (song_in_db == null || song_meaning.meaning[song_meaning.meaning.length - 1] != ".") {
        console.log("Error - song does not exist or cut off error ")

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
   
    return new Response("Success!")
 
}



