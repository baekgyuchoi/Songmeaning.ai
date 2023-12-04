'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FC, useContext, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

import { MessagesContext } from '@/context/messages';
import { SongInfo } from '@/lib/validators/song_info';
import ShortChatHeader from './ShortChatHeader';


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
const SongChat: FC<ChatProps> = (props) => {
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
            className=' font-mono '>
            <AccordionItem value='item-1'>
                <div className='w-full  border rounded-md overflow:hidden font-mono '>
                    <AccordionTrigger className='px-6 border-b border-zinc-300 truncate'>
                        <ShortChatHeader song_info={props.song_info}/>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-col h-96'>
                            <ChatMessages className = 'px-2 py-3 flex-1'/>
                            <ChatInput chatbot_prompt={props.chatbot_prompt} className='px-4' />
                        </div>
                    </AccordionContent>
                    
                </div>
            </AccordionItem>
        </Accordion>
        
    );
};

export default SongChat;
