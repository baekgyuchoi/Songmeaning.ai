
import prisma from '@/lib/db'


//maybe POST to alter databasenext c
export async function POST(request: Request) {
    
    const update_likes = await request.json()
    const song_slug = update_likes.song_slug
    const like_delta = update_likes.like_delta
   
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database
    try{
        await prisma.songs.update({
            where: {
                song_slug: song_slug,
            },
            data: {
                like_count: {
                    increment: like_delta
                },
                true_like_count: {
                    increment: like_delta
                }
            }
        })
        return new Response("Success!")
    }
    catch{
        return new Response("Error")
    }
        
 
}



