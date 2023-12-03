import { PrismaClient } from '@prisma/client'

//maybe POST to alter databasenext c
export async function POST(request: Request) {
    
    const song_meaning = await request.json() 
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database
    console.log(song_meaning.meaning)
    console.log(song_meaning.meaning[song_meaning.meaning.length - 1])
    const prisma = new PrismaClient()
    await prisma.$connect()
    const song_in_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_meaning.song_slug,
            },
        })
    if (song_in_db == null || song_meaning.meaning[song_meaning.meaning.length - 1] != ".") {

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



