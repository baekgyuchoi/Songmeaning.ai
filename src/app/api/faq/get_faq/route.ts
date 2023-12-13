import prisma from '@/lib/db'



export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    
    try{
        const req_slug = (queryParam.get('q') || "0")
        
        const faq = await prisma.fAQs.findUnique({
            where: {
                faq_slug: req_slug,
            },
        });
        


        return new Response(JSON.stringify(faq))
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


