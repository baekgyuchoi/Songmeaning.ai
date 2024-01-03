import prisma from '@/lib/db'

type SongPreview = {
    summary: string,
    emotional_journey: string,
    quotes: string
  }

  type Quote = {
    quote: string,
    explanation: string
  }




function formatText(stringInput: string) {
    const song_meaning_split = stringInput.split("\n")
          
    let formatted_meaning : SongPreview = {
        summary: "",
        emotional_journey: "",
        quotes: ""
    } 

    let text: string[] = []
    let has_conclusion = false


    if (song_meaning_split != null) {
        for(let paragraph of song_meaning_split){
            if (paragraph == "") {
            continue
            }


            if (paragraph.includes("Summary Analysis:")) {

            }
            
            else if (paragraph.includes("Emotional Journey:")) {
            
            formatted_meaning.summary = text.join("\n")
            text = []

            }
            else if (paragraph.includes("Quote Analysis:")) {
            formatted_meaning.emotional_journey = text.join("\n")
            text = []
            

            }
            else if (paragraph.includes("Conclusion:")) {
            formatted_meaning.quotes = text.join("\n")
            text = []
            has_conclusion = true
            }
            else{
            text.push(paragraph)
            }
        }
        if (has_conclusion == false) {
            formatted_meaning.quotes = text.join("\n")
        }
    }
    return formatted_meaning
}
  
//maybe POST to alter databasenext c
export async function POST(request: Request) {
    
    const song_meaning = await request.json() 
    // query if song_id exists in database or use song_slug instead
    // if song exists, return "song already exists"
    // if song does not exist, create song in database

    const song_in_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_meaning.song_slug,
            },
        })

    if (song_meaning.meaning[song_meaning.meaning.length - 1] != ".") {
    
        console.log("Error - song meaning cut off")
        return new Response("Error - song does not exist")
    }
    
    if (song_in_db == null) {
        console.log("Error - song does not exist or cut off error ")

        return new Response("Error - song does not exist")
    }

    await prisma.songMeaningPreview.create({
        data: {
            meaning: JSON.stringify(formatText(song_meaning.meaning)),
            createdAt: new Date(),
            song: {
                connect: {
                    song_slug: song_meaning.song_slug
                }
            }
        }
    })
   
    return new Response("Success!")
 
}



