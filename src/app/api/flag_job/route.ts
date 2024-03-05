import prisma from "@/lib/db"

type Song_Slug_JSON = {
    song_slug: string
}

export async function POST(request: Request) {
    
    const song_info = await request.json()  as Song_Slug_JSON
    const song_slug = song_info.song_slug
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database

    try{
        await prisma.jobs.update({
            where: {
                song_slug: song_slug
            },
            data: {
                flagged: true
            }
        })
        return new Response(JSON.stringify({'success': true}))
    }
    catch (e) {
        console.log(e)
        return new Response(JSON.stringify({'success': false}))
    }
}



