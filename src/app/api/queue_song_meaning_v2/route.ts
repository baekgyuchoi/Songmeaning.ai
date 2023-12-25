import * as Genius from "genius-lyrics";
import { SongInfo } from "@/lib/validators/song_info";
import prisma from "@/lib/db";
import { songMeaningPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";
import { getEncoding } from "js-tiktoken";

type ReferentAnnotation = {
    fragment: string
    annotation: string
}


function Get_Token_Length(input:string) {
    const encoding = getEncoding("cl100k_base");
    const tokens = encoding.encode(input);
    return tokens.length
    
}


type ReferentAnnotation = {
    fragment: string
    annotation: string
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


// async function getSongMeaning(song_title: string, artist: string, lyrics: string) {
    
//     const songMeaningContext = `Song: ${song_title}\nArtist: ${artist}\nLyrics: ${lyrics}\n\nMeaning:`

//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY
//     });

//     const gptResponse = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: songMeaningContext + songMeaningPrompt }],
//         model: 'gpt-3.5-turbo',
//     })

//     return gptResponse.choices[0].message
// }
export const maxDuration = 300 

export async function POST(req: Request) {
   
    const song_info = await req.json() as SongInfo
    try {      
        const song_lyrics = await getSongLyrics(song_info.genius_id)
        const genius_annotation = await getAnnotations(song_info.genius_id)
        console.log(genius_annotation)

        await prisma.songs.update({
            where: {
                song_slug: song_info.song_slug,
            },
            data: {
                lyrics: song_lyrics,

            }
        })
        
        let shorted_lyrics = song_lyrics
        while (Get_Token_Length(shorted_lyrics) > 1500) {
            shorted_lyrics = shorted_lyrics.slice(0,shorted_lyrics.length/2)
        }
   
        const songMeaningContext = `Song: ${song_info.song_title}\nArtist: ${song_info.artist_name}\nLyrics: ${shorted_lyrics}\nAnnotations: ${genius_annotation} \n\nMeaning:`

        const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: songMeaningContext + songMeaningPrompt }]
        const parsedMessages = MessageArraySchema.parse(messages)

        const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
            role: message.isUserInput ? 'user' : 'system',
            content: message.text,
        }))

        const payload: OpenAIStreamPayload = {
            model: 'ft:gpt-3.5-turbo-1106:personal::8TTC6hNk',
            messages: outboundMessages,
            temperature: 0.8,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.5,
            stream: true,
            n: 1,
        }  
       

        const stream = await OpenAIStream(payload)
       
        return new Response(stream)
    } catch (error) {
        console.error('An error occurred:', error)
        console.log("songlyrics are null")
            await prisma.songs.update({
                where: {
                    song_slug: song_info.song_slug,
                },
                data: {
                    isValid: false,
                }
            })
        return new Response('Error occurred: This song does not have lyrics', { status: 500 })
    }
}