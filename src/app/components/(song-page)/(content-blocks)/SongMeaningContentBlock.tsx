import { songMeaningSpecificPrompt } from "@/app/helpers/constants/queue-songmeaning-prompt";
import { SongInfo } from "@/lib/validators/song_info";
import OpenAI from "openai";
import Genius from "genius-lyrics";
import { getEncoding } from "js-tiktoken";
import prisma from "@/lib/db";


type ReferentAnnotation = {
    fragment: string
    annotation: string
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



async function GetSongMeaningContent(song_title: string, artist_name: string, lyrics: string, annotations: string) {
    const prompt = songMeaningSpecificPrompt

    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY
    });
    try{
        const completion = await openai.chat.completions.create({
            model : "gpt-3.5-turbo-0125",
            messages : [
                {"role": "system", "content": prompt},
                {"role": "user", "content": song_title + " by " + artist_name + '\n' + lyrics + '\n' + annotations},
            ],
            response_format : {
                type : "text",
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
   

interface SongMeaningContentProps {
    song_info: SongInfo
}

const SongMeaningContentBlock: React.FC<SongMeaningContentProps> = async (props) => {
    const song_info = props.song_info
    const song_db = await prisma.songs.findUnique({
        where: {
            song_slug: song_info.song_slug,
        },
        include: {
            song_meaning_preview: true,
        }
    }) 
    
    
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

  
    const song_meaning_content = await GetSongMeaningContent(props.song_info.song_short_title, props.song_info.artist_name, shorted_lyrics, genius_annotation)
    return(
        <>
            {song_meaning_content}
        </>
    )
}
export default SongMeaningContentBlock