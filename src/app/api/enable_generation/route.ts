import prisma from "@/lib/db"

type Song_Slug_JSON = {
    song_slug: string
}



export async function POST(request: Request) {

    const song_info = await request.json()  as Song_Slug_JSON
    const song_slug = song_info.song_slug


    try{
       await prisma.songs.update({
            where: {
                song_slug: song_slug
            },
            data: {
                generate_enabled: true
            }
        
       })
        return new Response(JSON.stringify({'success': true}))
    }
    catch (e) {
        console.log(e)
        return new Response(JSON.stringify({'success': false}))
    }
}



