'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FC, useContext, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

import { MessagesContext } from '@/context/messages';
import { SongInfo } from '@/lib/validators/song_info';


/**
 * Chat component props
 * to be implemented with Song and Artist Info
 */
interface ChatProps {
    song_info: SongInfo,
    chatbot_prompt: string
}



/**
 * Chat component
 * @param props Chat component props
 * @returns Chat component UI
 */
const Chat: FC<ChatProps> = (props) => {
    const {
        clearMessages
      } = useContext(MessagesContext)
    useEffect(() => {
        clearMessages()
      }, [])
    
    return (

        <Accordion 
            type='single' 
            collapsible 
            className='relative bg-white z-40 shadow '>
            <AccordionItem value='item-1'>
                <div className='fixed right-8 w-64 md:w-80 bottom-8 bg-gray-100 border-gray-200 rounded-md overflow:hidden'>
                    <AccordionTrigger className='px-6 border-b border-zinc-300'>
                        <ChatHeader song_info={props.song_info}/>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-col h-80'>
                            <ChatMessages className = 'px-2 py-3 flex-1'/>
                            <ChatInput chatbot_prompt={props.chatbot_prompt} className='px-4' />
                        </div>
                    </AccordionContent>
                    
                </div>
            </AccordionItem>
        </Accordion>
        
    );
};

export default Chat;
