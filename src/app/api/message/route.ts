
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream"
import { Message, MessageArraySchema } from "@/lib/validators/message"

type post_body = {
    messages: Message[],
    chatbot_prompt: string
}

export async function POST(req: Request) {
    const request_body = await req.json() as post_body

    const messages = request_body.messages
    const chatbotPrompt = request_body.chatbot_prompt

    const parsedMessages = MessageArraySchema.parse(messages)
    
    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
        role: message.isUserInput ? 'user' : 'system',
        content: message.text,
    }))

    outboundMessages.unshift({
        role: 'system',
        content: chatbotPrompt,
    })

    const payload: OpenAIStreamPayload = {
        model: 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.8,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        // max_tokens: 100,
        stream: true,
        n: 1,
    }

    const stream = await OpenAIStream(payload)
    return new Response(stream)
    
}