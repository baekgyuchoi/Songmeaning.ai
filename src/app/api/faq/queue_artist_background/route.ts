
import { Message, MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { nanoid } from "nanoid";
import { SongData } from "@/lib/validators/song_data_response";





export const maxDuration = 300 

export async function POST(req: Request) {
    const song_data = await req.json() as SongData
    const song_lyrics = song_data.lyrics

    if (song_lyrics == null) {
        return new Response("Error - song lyrics not found")
    }

    

    const messages: Message[] = [{ id: nanoid(), isUserInput: true, text: "Can you provide background information about (Artist name)? Including details about their early life/family background, dating life, career beginnings and career progression, notable achievements, notable controversies, fun facts, details of personal life that only the most fervent fans would be aware of, significant albums or songs, and any impact or influence they've had on the music industry or culture? Please do not feel limited and go as deep into the weeds as possible.  For example, if you were discussing Enya you would want to include details of how she decorates her castle, details of her attempted kidnappings, how and why she does not tour.  For Taylor Swift you would want to discuss her notable controversies in detail such as how kanye came on stage. Please also include 3-5 important quotes from the artist about their career, philosophy or anything that speaks to them as a person."  }]
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
        presence_penalty: 0,
        max_tokens: 2000,
        stream: true,
        n: 1,
    }  
    

    const stream = await OpenAIStream(payload)
    
    return new Response(stream)
    
}