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

    const job_checked = job?.checked || 0


    if (job == null) { 
        
        return new Response(JSON.stringify({'isJobDone': false}))
    }
    const isJobComplete = job.isJobDone 
    if (isJobComplete || job_checked > 6) {
        return new Response(JSON.stringify({'isJobDone': true}))
    }
    else {
        await prisma.jobs.update({
            where: {
                song_slug: req_slug
            },
            data: {
                checked: job_checked + 1
            }
        
        })
        return new Response(JSON.stringify({'isJobDone': false}))
    }

}


