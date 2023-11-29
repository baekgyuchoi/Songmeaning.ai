'use client'
import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useContext } from 'react'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement>{}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {
    const {
        messages,
        addMessage,
        inputRef
        } = useContext(MessagesContext)
    const inverseMessages = [...messages].reverse()
    return (
        <div 
        {...props}
        className = {cn('flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch', 
            className
        )}>
            <div className='flex-1 flex-grow'></div>
                
                {inverseMessages.map((message) => (
                    message.text ? (
                        <div key={message.id} className='chat-message'>
                            <div className={cn('flex items-end',{
                                'justify-end': message.isUserInput,
                                // put user messages on right and bot messages on left
                            })}>
                                <div
                                    className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                                    'order-1 items-end': message.isUserInput,
                                    'order-2 items-start': !message.isUserInput,
                                    })}>
                                    <p
                                    className={cn('px-4 py-2 rounded-lg', {
                                        'bg-blue-600 text-white': message.isUserInput,
                                        'bg-gray-200 text-gray-900': !message.isUserInput,
                                    })}>
                                    {message.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={nanoid()}></div>
                    )
                ))}
                <div className='chat-message'>
                <div className={cn('flex items-end',{
                    'justify-end': false,
                    // put user messages on right and bot messages on left
                })}>
                    <div
                        className={cn('flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden', {
                        'order-1 items-end': false,
                        'order-2 items-start': true,
                        })}>
                        <p
                        className={cn('px-4 py-2 rounded-lg', {
                            'bg-blue-600 text-white': false,
                            'bg-gray-200 text-gray-900': true,
                        })}>
                        <p > Hello, what can I do for you? </p> 
                        <button onClick={
                                () => {
                                    addMessage({
                                        id: nanoid(),
                                        isUserInput: true,
                                        text: 'give me 2 songs with similar lyric meanings'
                                    }),
                                    inputRef?.current?.focus()
                                    inputRef?.current?.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', code: 'Enter', which: 13, bubbles: true, cancelable: true}))
                                    
                                }
                            
                            }>
                                <p className='text-blue-800 underline'>Songs with similar lyric meaning</p>
                                
                        </button>
                            <button onClick={
                                () => {
                                    addMessage({
                                        id: nanoid(),
                                        isUserInput: true,
                                        text: 'give me a concise background of the artist in no more than 3 sentences'
                                    }),
                                    inputRef?.current?.focus()
                                    inputRef?.current?.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', which: 13, bubbles: true, cancelable: true}))

                                }
                            
                            }>
                                <p className='text-blue-800 underline'>Artist background</p>
                                
                            </button>
                        </p>
                    </div>
                </div>



                    
                </div>
                
            
        </div>
    )
}

export default ChatMessages