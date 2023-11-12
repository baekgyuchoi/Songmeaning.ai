import { PrismaClient } from "@prisma/client"



export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    
    try{
        const req_slug = (queryParam.get('q') || "0")
        const prisma = new PrismaClient()
        const song = await prisma.songs.findUnique({
            where: {
                song_slug: req_slug,
            },
        });
        let response_body = {
            "Song exists": false,
        }
        if (song != null) {
            response_body = {
                "Song exists": true,
            }
        }
        else{
            response_body = {
                "Song exists": false,
            }
        }
        return new Response(JSON.stringify(response_body))
    }
    catch{
        return new Response("Error")
    }
    // const url = new URL(request.url)
    // const queryParam = url.searchParams
    // const song_id = queryParam.get('q')
    // query if song_id exists in database or use song_slug instead
    
    // return new Response()
}


