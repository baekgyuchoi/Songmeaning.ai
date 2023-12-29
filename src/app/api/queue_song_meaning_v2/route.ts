import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import prisma from "@/lib/db";
import { songMeaningPrompt, songBackgroundPrompt, songQuotesPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { getEncoding } from "js-tiktoken";
import OpenAI from "openai";


type formatted_meaning = {
    "summary_analysis": string,
    "background": string,
    "emotional_journey": string,
    "quotes": string,
    "conclusion": string
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
    


    const geniusAPISongsURL = 'https://api.genius.com/songs/'
    const song = await fetch(geniusAPISongsURL + song_id,{
        headers: {
            Authorization: `Bearer ${process.env.GENIUS_API_KEY_1}`
        }
    })

    const song_json = await song.json()
    const annotation = convertToPlainText(JSON.stringify(song_json.response.song.description_annotation.annotations[0].body.dom))
    await prisma.songs.update({
        where: {
            genius_id: song_id,
        },
        data: {
            annotations: annotation,
        }
    })
    
    
    return annotation
}

async function getSongLyrics(song_id: number) {
    const Client = new Genius.Client(process.env.GENIUS_API_KEY_1);
    const SongsClient = Client.songs;
    const searchSong = await SongsClient.get(song_id)
    let lyrics = await searchSong.lyrics();
    await prisma.songs.update({
        where: {
            genius_id: song_id,
        },
        data: {
            lyrics: lyrics,

        }
    })
  
    return lyrics
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

    return gptResponse.choices[0].message.content
}

async function getSongQuotes(song_title: string, artist: string, lyrics: string, annotations: string) {
    
    const songMeaningContext = `Song: ${song_title}\nArtist: ${artist}\nLyrics: ${lyrics}\nAnnotations: ${annotations} \n\nMeaning:`

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const gptResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: songMeaningContext + songQuotesPrompt }],
        model: 'gpt-4-1106-preview',
    })

    return gptResponse.choices[0].message.content
}


export const maxDuration = 300 

export async function POST(req: Request) {
   
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
        const song_lyrics = await getSongLyrics(song_info.genius_id)
        const genius_annotation = await getAnnotations(song_info.genius_id)

        
        
        let shorted_lyrics = song_lyrics
        while (Get_Token_Length(shorted_lyrics) > 1500) {
            shorted_lyrics = shorted_lyrics.slice(0,shorted_lyrics.length/2)
        }

        const meaning = await getSongMeaning(song_info.song_title, song_info.artist_name, shorted_lyrics, genius_annotation)
        const res_v2 = {
            meaning: meaning,
        }
        

        //Check if meanings are legit:
        if (meaning!.length > 400) {
            //format meaning
            //save each section separately
            if(song_data!.song_meaning == null){
                await prisma.songMeaning.create({
                    data: {
                        meaning: "Meaning Stored",
                        meaning_v2: JSON.stringify(res_v2),
                        createdAt: new Date(),
                        song: {
                            connect: {
                                song_slug: song_info.song_slug
                            }
                        }
                    }
                })
            }
            else{
                await prisma.songMeaning.update({
                    where: {
                        slug: song_info.song_slug
                    },
                    data: {
                        meaning_v1: JSON.stringify(res_v2),
                    }
                })
            }
            
        }
        return new Response("Success")
    }
    catch (err) {
        console.log(err)
        return new Response("Error - songmeaningv2")
    }
}