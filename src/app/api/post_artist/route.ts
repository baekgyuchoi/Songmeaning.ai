
import { Artist } from "@/lib/validators/artist";
import { PrismaClient } from '@prisma/client'

//maybe POST to alter databasenext c
export async function POST(request: Request) {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const artist = await request.json() as Artist
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database
    const artist_in_db = await prisma.artist.findUnique({
        where: {
            artist_slug: artist.artist_slug,
            },
        })
    if (artist_in_db != null) {
        await prisma.$disconnect()
        
        return new Response("Error - artist already exists in db")
    }
  
    
    await prisma.artist.create({
        data: {
            artist_slug: artist.artist_slug,
            name: artist.name,
            genius_id: artist.genius_id,
        }
    })
    await prisma.$disconnect()
    return new Response("Success!")
 
}

