import { PrismaClient } from "@prisma/client"



export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    const prisma = new PrismaClient()
    await prisma.$connect()
    
    try{
        const req_slug = (queryParam.get('q') || "-")
        
        const song = await prisma.artist.findUnique({
            where: {
                artist_slug: req_slug,
            },
        });
        let response_body = {
            "song_exists": false,
        }
        if (song != null) {
            response_body = {
                "song_exists": true,
            }
        }
        else{
            response_body = {
                "song_exists": false,
            }
        }
        await prisma.$disconnect()
        return new Response(JSON.stringify(response_body))
    }
    catch{
        await prisma.$disconnect()
        return new Response("Error")
    }
    // const url = new URL(request.url)
    // const queryParam = url.searchParams
    // const song_id = queryParam.get('q')
    // query if song_id exists in database or use song_slug instead
    
    // return new Response()
}


