'use client'
import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useContext } from 'react'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement>{}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const {messages} = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()

    return (
        <div 
        {...props}
        className = {cn('flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch', 
            className
        )}>
            <div className='flex-1 flex-grow'></div>
            {inverseMessages.map((message) => (
                <div key={message.id} className='chat-message'>
                    <div className={cn('flex items-end',{
                        'justify-end': message.isUserInput,
                        // put user messages on right and bot messages on left
                    })}>
                        <div className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                            'bg-blue-600 text-white': message.isUserInput,
                            'bg-gray-200 text-gray-900': !message.isUserInput,
                        })}>
                            <p > {message.text} </p>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default ChatMessages