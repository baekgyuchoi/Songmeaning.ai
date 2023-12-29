
import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";
import { SongData } from "@/lib/validators/song_data_response";



async function GetArtist(artist_id: number) {
    const geniusAPIArtistURL = 'https://api.genius.com/artists/'

    const artist_info = await fetch(geniusAPIArtistURL + artist_id,{
        headers: {
            Authorization: `Bearer ${process.env.GENIUS_API_KEY_1}`
        }
    })
    const artist_info_json = await artist_info.json()

    return artist_info_json.response.artist.description.dom
}




export const maxDuration = 300 

export async function POST(req: Request) {
    const song_data = await req.json() as SongData
   
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
    
    const artist = await GetArtist(song_data.artist_id)
    let artist_info = convertToPlainText(JSON.stringify(artist))
    

    const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: `Adding this information to what you know: \n ${artist_info} \n Can you provide a written background on the artist: ${song_data.artist_name}? Including details about what is widely known about their early life/family background, dating life, career beginnings and career progression, notable achievements, notable controversies, fun facts, details of personal life that only the most fervent fans would be aware of, significant albums or songs, and any impact or influence they've had on the music industry or culture? Please do not feel limited and go as deep into the weeds as possible.  For example, if you were discussing Enya you would want to include details of how she decorates her castle, details of her attempted kidnappings, how and why she does not tour.  For Taylor Swift you would want to discuss her notable controversies in detail such as how kanye came on stage. Please also include 3-5 important quotes from the artist about their career, philosophy or anything that speaks to them as a person. if there is insufficient information, write short paragraph using the information given. Keep the response under 1000 tokens.
    `  }]
    const parsedMessages = MessageArraySchema.parse(messages)

    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserInput ? 'user' : 'system',
        content: message.text,
    }))

    const payload: OpenAIStreamPayload = {
        model: 'ft:gpt-3.5-turbo-1106:personal::8TTC6hNk',
        messages: outboundMessages,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        n: 1,
    }  
    

    const stream = await OpenAIStream(payload)
    
    return new Response(stream)
    
}