import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FC } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

/**
 * Chat component props
 * to be implemented with Song and Artist Info
 */
interface ChatProps {
}

/**
 * Chat component
 * @param props Chat component props
 * @returns Chat component UI
 */
const Chat: FC<ChatProps> = ({}) => {
    return (

        <Accordion 
            type='single' 
            collapsible 
            className='relative bg-white z-40 shadow'>
            <AccordionItem value='item-1'>
                <div className='fixed right-8 w-80 bottom-8 bg-white border-gray-200 rounded-md overflow:hidden'>
                    <AccordionTrigger className='px-6 border-b border-zinc-300'>
                        <ChatHeader />
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='flex flex-col h-80'>
                            <ChatMessage />
                            <ChatInput className='px-4' />
                        </div>
                    </AccordionContent>
                    
                </div>
            </AccordionItem>
        </Accordion>
        
    );
};

export default Chat;
