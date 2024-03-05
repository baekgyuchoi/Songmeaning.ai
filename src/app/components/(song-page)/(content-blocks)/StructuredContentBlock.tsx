import { songStructuredPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { SongInfo } from "@/lib/validators/song_info";
import * as Genius from "genius-lyrics";
import { getEncoding } from "js-tiktoken";
import prisma from "@/lib/db";
import OpenAI from "openai";
import JobLoadingContentBlock from "./JobLoadingContentBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type ReferentAnnotation = {
    fragment: string
    annotation: string
}

type SongMeaningStructured = {
    background: {
        first_point: string
        second_point: string
    }
    intro: string
    meaning: {
        paragraph_1: string
        paragraph_2: string
        paragraph_3: string
        paragraph_4: string
    }
    quotes: {
        quote_1: {
            quote: string
            explanation: string
        }
        quote_2: {
            quote: string
            explanation: string
        }
        quote_3: {
            quote: string
            explanation: string
        }
        quote_4: {
            quote: string
            explanation: string
        }
    }

}


async function PostSongMeaningToDB(song_meaning_structured: SongMeaningStructured, song_slug: string) {
    await prisma.songMeaningStructured.create({
        data: {
            slug: song_slug,
            background: {
                create: {
                    firstPoint: song_meaning_structured.background.first_point,
                    secondPoint: song_meaning_structured.background.second_point
                }
            },
            intro: song_meaning_structured.intro,
            meaning: {
                create: {
                    paragraph1: song_meaning_structured.meaning.paragraph_1,
                    paragraph2: song_meaning_structured.meaning.paragraph_2,
                    paragraph3: song_meaning_structured.meaning.paragraph_3,
                    paragraph4: song_meaning_structured.meaning.paragraph_4
                }
            },
            quotes: {
                createMany: {
                    data: [
                        {
                            quote: song_meaning_structured.quotes.quote_1.quote,
                            explanation: song_meaning_structured.quotes.quote_1.explanation
                        }
                    ,
                        {
                            quote: song_meaning_structured.quotes.quote_2.quote,
                            explanation: song_meaning_structured.quotes.quote_2.explanation
                        }
                    ,
                    {
                            quote: song_meaning_structured.quotes.quote_3.quote,
                            explanation: song_meaning_structured.quotes.quote_3.explanation
                        }
                    ,
                    {
                            quote: song_meaning_structured.quotes.quote_4.quote,
                            explanation: song_meaning_structured.quotes.quote_4.explanation
                    }
                    ]
                }
            }
        }
    })

}


function Get_Token_Length(input:string) {
    const encoding = getEncoding("cl100k_base");
    const tokens = encoding.encode(input);
    return tokens.length
    
}



async function getAnnotations(song_id: number) {

    const findTokenLength = (arr : any[]) => {
        let str = ""
        for (let item of arr) {
            str += "fragment: "
            str += item.fragment
            str += " annotation: "
            str += item.annotation
        }
        return Get_Token_Length(str)
    }

    const convertToPlainText = (input: string) => {
        let annotation_info = ""
        const json_input = JSON.parse(input)
        if(json_input.children != null) {
            for (let child of json_input.children) {
                if (child.children != null) {
                    
                    for (let grandchild of child.children) {
            
                        if (typeof(grandchild) == "string") {
                            annotation_info += " " + grandchild
                        }
                        else{
                            if (grandchild.children != null) {
                                for (let greatgrandchild of grandchild.children) {
                                    if (typeof(greatgrandchild) == "string") {
                                        annotation_info += " " + greatgrandchild
                                    }
                                    else{
                                        if (greatgrandchild.children != null) {
                                            for (let greatgreatgrandchild of greatgrandchild.children) {
                                                if (typeof(greatgreatgrandchild) == "string") {
                                                    annotation_info += " " + greatgreatgrandchild
                                                }
                                            }
                                        }   
                                    }
                                }
                            }
                        
                        }
                    }
                
                }
            }
        }
        return annotation_info
    }
    

    const geniusAPIReferentsURL = 'https://api.genius.com/referents?song_id='
    const geniusAPISongsURL = 'https://api.genius.com/songs/'
    const song = await fetch(geniusAPISongsURL + song_id,{
        headers: {
            Authorization: `Bearer ${process.env.GENIUS_API_KEY_1}`
        }
    })

    const referents = await fetch(geniusAPIReferentsURL + song_id,{
        headers: {
            Authorization: `Bearer ${process.env.GENIUS_API_KEY_1}`
        }
    })
    const referents_json = await referents.json()
    const song_json = await song.json()
    const referents_arr = referents_json.response.referents
    let lyric_annotations: ReferentAnnotation[] = []
    let song_annotations: ReferentAnnotation[] = []

    const song_res: ReferentAnnotation = {
        fragment: "",
        annotation: convertToPlainText(JSON.stringify(song_json.response.song.description_annotation.annotations[0].body.dom))
    }
    song_annotations.push(song_res)
    for (let referent of referents_arr) {
        if (referent.classification == "verified") {
            let annotation_info = ""

            if(referent.annotations.length > 0){
                annotation_info = convertToPlainText(JSON.stringify(referent.annotations[0].body.dom))
            }
            
            const res: ReferentAnnotation = {
                fragment: referent.fragment,
                annotation: annotation_info
            }
    
            lyric_annotations.push(res)
        }
    }

    
    for (let referent of referents_arr) {
        if (referent.classification == "accepted") {
            if (findTokenLength(song_annotations) + findTokenLength(lyric_annotations) > 500) {
                break
            }
            let annotation_info = ""

            if(referent.annotations.length > 0){
                annotation_info = convertToPlainText(JSON.stringify(referent.annotations[0].body.dom))
            }
            
            const res: ReferentAnnotation = {
                fragment: referent.fragment,
                annotation: annotation_info
            }

            lyric_annotations.push(res)
        }
    }
  


    let res_str = "Overall Song Annotation: " + "\n\n"
    for (let annotation of song_annotations) {
        res_str += annotation.annotation + "\n"
    }
    res_str += "\n\nLyric Annotations:\n\n"
    for (let annotation of lyric_annotations) {
        res_str += "fragment: " + annotation.fragment + "\nAnnotation: " + annotation.annotation + "\n\n"
    }

    return res_str

}

async function getSongLyrics(song_id: number) {
    const Client = new Genius.Client(process.env.GENIUS_API_KEY_1);
    const SongsClient = Client.songs;
    const searchSong = await SongsClient.get(song_id)
    const lyrics = await searchSong.lyrics();
    return lyrics
}

async function GetStructuredContent(song_title: string, artist_name: string, lyrics: string, annotations: string) {
    const prompt = songStructuredPrompt

    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY
    });
    try{
        const completion = await openai.chat.completions.create({
            model : "gpt-3.5-turbo-0125",
            max_tokens : 4096,
            messages : [
                {"role": "system", "content": prompt},
                {"role": "user", "content": song_title + " by " + artist_name + '\n' + lyrics + '\n' + annotations},
            ],
            response_format : {
                type : "json_object",
            },
            
            temperature : 0.7
          })
        
          return completion.choices[0].message.content
    }
    catch(err) {
        console.log(err)
        return "error"
    }
   
   
  
  }
  
interface StructuredContentProps {
    song_info: SongInfo
}


  
const StructuredContentBlock: React.FC<StructuredContentProps> =  async (props) => {
    const song_info = props.song_info
    const song_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_info.song_slug,
        },
        include: {
            song_meaning_structured: {
                include: {
                    background: true,
                    meaning: true,
                    quotes: true
                }
            }
        }

    })


    
    if (song_db?.song_meaning_structured != null) {
        const song_meaning_structured = song_db.song_meaning_structured
        if (song_meaning_structured.background == null || song_meaning_structured.meaning == null || song_meaning_structured.quotes == null || song_meaning_structured.intro == null) {
            await prisma.songMeaningStructured.update({
                where: {
                    slug: song_info.song_slug,
                },
                data: {
                    flagged: true
                }
                
            })
            return(
                <div>
                    ERROR
                </div>
            )

        }
        return(
            <div>
            <div className="font-normal">
              <div className='text-gray-800 '>
                  <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                      {song_meaning_structured.intro}
                      
                  </p>
              </div>
              <div className='text-gray-800 mt-10'>
                  <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                      <h2 className='text-xl font-semibold ml-2'>Song Meaning</h2>
                  </div>
                  
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph1}
                    </p>
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph2}
                    </p>
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph3}
                    </p>
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph4}
                    </p>
                     
              </div>
              <div className='text-gray-800 mt-10'>
                  <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                      <h2 className='text-xl font-semibold ml-2'>Quotes</h2>
                  </div>
                  <div className="mx-2 mt-4">      
                  {song_meaning_structured.quotes.map((quote, index) => {
                        return(
                            <div key={index} className='mt-6'>
                                <p className='italic text-lg'>{`"${quote.quote}"`}</p>
                                <p className='mt-2 text-base sm:text-lg leading-relaxed'>{quote.explanation}</p>
                            </div>
                        )
                  })}      
                  
                  </div>
              </div>
            </div>
            
        </div>
        )
    }

    const job = await prisma.jobs.findUnique({
        where: {
            song_slug: song_info.song_slug
        }
    })

    if (job == null) {
        await prisma.jobs.create({
            data: {
                song_slug: song_info.song_slug,
            }
        })
    }
    else{
        if (job.flagged) {
            return(
                <div className='container flex items-center justify-center mt-10'>
                    <Card className="mb-0.5 flex-1  bg-white px-4 pt-4 pb-4 sm:mb-8 sm:flex-initial rounded-md md:px-10 md:pt-9 md:pb-10 ">

                        <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                        <CardTitle className="text-xl font-bold text-gray-800">This song is invalid</CardTitle>
                        
                        </CardHeader>
                
                        <CardContent className="p-6 text-gray-700">
                        
                        </CardContent>
                
                        
                        
                    </Card>
                </div>
            )
        }
        console.log("HAHAHAHAHAH JOB EXISTS")
        return(
            <JobLoadingContentBlock song_slug = {song_info.song_slug}/>
        )
    }
    
    let song_lyrics = song_db?.lyrics!
    if (song_db?.lyrics == null) {
        song_lyrics = await getSongLyrics(song_info.genius_id)
        await prisma.songs.update({
            where: {
                song_slug: song_info.song_slug,
            },
            data: {
                lyrics: song_lyrics,

            }
        })
    }
    const genius_annotation = await getAnnotations(song_info.genius_id)

    
    
    let shorted_lyrics = song_lyrics
    while (Get_Token_Length(shorted_lyrics) > 1500) {
        shorted_lyrics = shorted_lyrics.slice(0,shorted_lyrics.length/2)
    }

    const song_meaning = await GetStructuredContent(props.song_info.song_short_title, props.song_info.artist_name, shorted_lyrics, genius_annotation)
    try{
        const song_meaning_structured = JSON.parse(song_meaning!) as SongMeaningStructured 
        try{
            await PostSongMeaningToDB(song_meaning_structured, song_info.song_slug)
            await prisma.jobs.update({
                where: {
                    song_slug: song_info.song_slug
                },
                data: {
                    isJobDone: true
                }
            })
        }
        catch(
            err
        ) {
            console.log(err)
        }
        
    
    return(
        <div>
            <div className="font-normal">
              <div className='text-gray-800 '>
                  <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                      {song_meaning_structured.intro}
                      
                  </p>
              </div>
              <div className='text-gray-800 mt-10'>
                  <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                      <h2 className='text-xl font-semibold ml-2'>Song Meaning</h2>
                  </div>
                  
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph_1}
                    </p>
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph_2}
                    </p>
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph_3}
                    </p>
                    <p className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                        {song_meaning_structured.meaning.paragraph_4}
                    </p>
                     
              </div>
              <div className='text-gray-800 mt-10'>
                  <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                      <h2 className='text-xl font-semibold ml-2'>Quotes</h2>
                  </div>
                  <div className="mx-2 mt-4">            
                    <div  className='mt-6'>
                        <p className='italic text-lg'>{`"${song_meaning_structured.quotes.quote_1.quote}"`}</p>
                        <p className='mt-2 text-base sm:text-lg leading-relaxed'>{song_meaning_structured.quotes.quote_1.explanation}</p>
                    </div>
                    <div  className='mt-6'>
                        <p className='italic text-lg'>{`"${song_meaning_structured.quotes.quote_2.quote}"`}</p>
                        <p className='mt-2 text-base sm:text-lg leading-relaxed'>{song_meaning_structured.quotes.quote_2.explanation}</p>
                    </div>
                    <div  className='mt-6'>
                        <p className='italic text-lg'>{`"${song_meaning_structured.quotes.quote_3.quote}"`}</p>
                        <p className='mt-2 text-base sm:text-lg leading-relaxed'>{song_meaning_structured.quotes.quote_3.explanation}</p>
                    </div>
                    <div  className='mt-6'>
                        <p className='italic text-lg'>{`"${song_meaning_structured.quotes.quote_4.quote}"`}</p>
                        <p className='mt-2 text-base sm:text-lg leading-relaxed'>{song_meaning_structured.quotes.quote_4.explanation}</p>
                    </div>
                  </div>
              </div>
            </div>
            
        </div>

    )
    }
    catch(err) {
        console.log(err)
        return(
            <div>
                ERROR
            </div>
        )
    }
   
    
  }
  export default StructuredContentBlock