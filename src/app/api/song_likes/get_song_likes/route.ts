import prisma from '@/lib/db'



export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    const req_slug = (queryParam.get('q') || "0")
    console.log(req_slug)
    
    try{
        const song = await prisma.songs.findUnique({
            where: {
                song_slug: req_slug,
            },
        });
        console.log(song)
        console.log(song?.like_count)
        
        

        return new Response(JSON.stringify({"like_count": song?.like_count}))
    }
    catch{

        return new Response()
    }
    // const url = new URL(request.url)
    // const queryParam = url.searchParams
    // const song_id = queryParam.get('q')
    // query if song_id exists in database or use song_slug instead
    
    // return new Response()
}


