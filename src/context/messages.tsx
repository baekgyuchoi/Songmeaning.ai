import { Message } from "@/lib/validators/message"
import { nanoid } from "nanoid"
import { ReactNode, createContext, useState } from "react"

 export const MessagesContext = createContext<{
        messages: Message[]
        isMessageUpdating: boolean
        inputRef: React.RefObject<HTMLTextAreaElement> | null
        setInputRef: (ref: React.RefObject<HTMLTextAreaElement> | null) => void
        addMessage: (message: Message) => void
        removeMessage: (id: string) => void
        updateMessage: (id: string, updateFn: (prevText: string) => string) => void
        setIsMessageUpdating: (isUpdating: boolean) => void
        clearMessages: () => void
    }>({
        messages: [],
        isMessageUpdating: false,
        inputRef: null,
        setInputRef: () => {},
        addMessage: () => {},
        removeMessage: () => {},
        updateMessage: () => {},
        setIsMessageUpdating: () => {},
        clearMessages: () => {},
    })

export function MessagesProvider({children}: {children: ReactNode}) {
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[]>([
       
    ])
    const [inputRef, setInputRef] = useState<React.RefObject<HTMLTextAreaElement> | null>(null)
    

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]) 
    }

    const removeMessage = (id: string) => {
        setMessages((prev) => prev.filter((message) => message.id !== id))
    }

    const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
        setMessages((prev) => prev.map((message) => {
            if (message.id === id) {
                return {...message, text: updateFn(message.text)}
            }
            return message
        }))
    }
    const clearMessages = () => {
        setMessages([
            
        ])
    }

    return (
    <MessagesContext.Provider value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
        inputRef,
        setInputRef,
        clearMessages
    }}>
        {children}
    </MessagesContext.Provider>
    )
}