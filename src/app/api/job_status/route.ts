import prisma from "@/lib/db"

export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams

    const req_slug = (queryParam.get('q') || "0")


    const job = await prisma.jobs.findUnique({
        where: {
            song_slug: req_slug
        }
    })
    if (job == null) { 
        return new Response(JSON.stringify({'isJobDone': false}))
    }
    const isJobComplete = job.isJobDone 
    if (isJobComplete) {
        return new Response(JSON.stringify({'isJobDone': true}))
    }
    else {
        return new Response(JSON.stringify({'isJobDone': false}))
    }

}


