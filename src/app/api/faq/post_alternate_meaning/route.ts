import { FAQ } from '@/lib/validators/FAQ'
import prisma from '@/lib/db'


//maybe POST to alter databasenext c
export async function POST(request: Request) {
    
    const faq_answer = await request.json() as FAQ
    
   
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database
  
    
    
    if (faq_answer.answer[faq_answer.answer.length - 1] != ".") {

        
        console.log("Error - song meaning cut off")
        return new Response("Error - song does not exist")
    }
    await prisma.fAQs.create({
        data: {
            song_slug: faq_answer.song_slug,
            question: faq_answer.question,
            answer: faq_answer.answer,
            faq_slug: faq_answer.faq_slug,
            prompt: faq_answer.prompt,
        }
    })
   

    return new Response("Success!")
 
}



