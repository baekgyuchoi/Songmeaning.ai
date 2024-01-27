import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import prisma from "@/lib/db";
import { songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { getEncoding } from "js-tiktoken";
import { v1songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt-v1";
import OpenAI from "openai";
import { format } from "path";
import { SongMeaning } from "@/lib/validators/song_meaning";

type ReferentAnnotation = {
    fragment: string
    annotation: string
}
type meaning_format = {
    "summary" : string,
    "emotional_journey" : String[],
    "quotes" : any[]
    "background" : String[]
}


type formatted_meaning = {
    "summary_analysis": string,
    "background": string,
    "emotional_journey": string,
    "quotes": string,
    "conclusion": string
    "meaning": string
  }


function Get_Token_Length(input:string) {
    const encoding = getEncoding("cl100k_base");
    const tokens = encoding.encode(input);
    return tokens.length
    
}

async function getSongMeaning(song_title: string, artist: string, lyrics: string, annotations: string) {
    
    const songMeaningContext = `Song: ${song_title}\nArtist: ${artist}\nLyrics: ${lyrics}\n Annotations: ${annotations}\n\nMeaning:`

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const gptResponse = await openai.chat.completions.create({
        messages: [{role: 'system', content: songMeaningPrompt},{ role: 'user', content: songMeaningContext}],
        model: 'gpt-4-1106-preview',
    })
    if (gptResponse.choices[0].finish_reason != "stop"){
        console.log("cutoff error -> queuesongmeaningv1")
    }
    if (gptResponse.choices[0].message.content?.includes('`')){
        console.log("WRONG FORMAT")
        return "{" + gptResponse.choices[0].message.content.split("{").slice(1,).join("{").split("}").slice(0,-1).join("}") + "}"
        
    }

    return gptResponse.choices[0].message.content
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


export const maxDuration = 300 

export async function POST(req: Request) {
    console.log("V1QueueMeaning Started")
    const song_info = await req.json() as SongInfo
    const song_data = await prisma.songs.findUnique({
        where: {
            song_slug: song_info.song_slug
        },
        include: {
            song_meaning: true
        }
    })
    try {
        let song_lyrics = song_data?.lyrics  
        let genius_annotation = song_data?.lyrics
        if (song_lyrics == null || song_lyrics == ""){
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
        if (genius_annotation == null || genius_annotation == ""){
            genius_annotation = await getAnnotations(song_info.genius_id)
            await prisma.songs.update({
                where: {
                    song_slug: song_info.song_slug,
                },
                data: {
                    annotations: genius_annotation
                }
            })
        }
        
        
        let shorted_lyrics = song_lyrics
        while (Get_Token_Length(shorted_lyrics) > 1500) {
            shorted_lyrics = shorted_lyrics.slice(0,shorted_lyrics.length/2)
        }
        
       

        const song_meaning_v2 = await getSongMeaning(song_info.song_title, song_info.artist_name, shorted_lyrics, genius_annotation)
        let isFlagged = false
        try{
            const JSON_test = JSON.parse(song_meaning_v2!)
            if (JSON_test.summary == null || JSON_test.summary == "" || JSON_test.background == null || JSON_test.background == "" || JSON_test.emotional_journey == null || JSON_test.emotional_journey == "" || JSON_test.emotional_journey == "" || JSON_test.quotes == null || JSON_test.quotes == ""){
                isFlagged = true
            }
           
            if (typeof(JSON_test.emotional_journey) == "string"){
                isFlagged = true
            }
        }
        catch{ 
            const json_response = {"valid": false}
            return new Response(JSON.stringify(json_response))

        }


        if(song_data!.song_meaning == null){
            await prisma.songMeaning.create({
                data: {
                    meaning: song_meaning_v2!,
                    createdAt: new Date(),
                    flagged: isFlagged,
                    song: {
                        connect: {
                            song_slug: song_info.song_slug
                        }
                    }
                }
            })
            console.log("V1QueueMeaning Finished")
        }

       
        const json_response = {"valid": true}
        return new Response(JSON.stringify(json_response))
    } catch (error) {
        console.error('An error occurred:', error)
      
        return new Response('Error occurred: This song does not have lyrics', { status: 500 })
    }
}