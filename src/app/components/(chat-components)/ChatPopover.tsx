'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FC, useContext, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

import { MessagesContext } from '@/context/messages';
import { SongInfo } from '@/lib/validators/song_info';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { 
    useDisclosure,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    ModalContent
 } from "@nextui-org/react"
import ShortChatHeader from './ShortChatHeader';



/**
 * Chat component props
 * to be implemented with Song and Artist Info
 */
interface ChatPopoverProps {
    song_info: SongInfo,
    chatbot_prompt: string
}



/**
 * Chat component
 * @param props Chat component props
 * @returns Chat component UI
 */
const ChatPopover: FC<ChatPopoverProps> = (props) => {
 
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {song_info, chatbot_prompt} = props;

    
    return (

        <>
          <div className='fixed right-8 w-fit bottom-8 bg-gray-100 border-gray-200 p-3 rounded-md overflow:hidden'>
            <Button onPress={onOpen} className=''>
              <ShortChatHeader song_info={props.song_info}/>
            </Button>
          </div>
          <Modal size='lg' placement='bottom' scrollBehavior="inside" shouldBlockScroll={false} isOpen={isOpen} onOpenChange={onOpenChange} closeButton={<div className=''><button><p className="pr-6 underline text-sm text-gray-500">close</p></button></div>} className=''>
            <ModalContent className=''>
              {(onClose) => (
                <div className='bg-white  border rounded-md p-2 '>
                  <ModalHeader className="flex flex-col gap-1">
                    <ChatHeader song_info={props.song_info}/>
                  </ModalHeader>
                  <ModalBody>
                    <div className='flex flex-col h-72'>
                        <ChatMessages className = 'px-2  flex-1'/>
                        <ChatInput chatbot_prompt={props.chatbot_prompt} className='px-4' />
                    </div>
                  </ModalBody>
                  
                </div>
              )}
            </ModalContent>
          </Modal>
    </>

        // <Popover>
        //     <PopoverTrigger asChild>
        //         <div className='fixed right-8 w-80 bottom-8 bg-gray-100 border-gray-200 rounded-md overflow:hidden'>
        //             <button>
        //                 <ChatHeader song_info={props.song_info}/>
        //             </button>
        //         </div>
        //     </PopoverTrigger>
        //     <PopoverContent className='min-w-screen'>
        //         <div>
        //             HI
        //         </div>
        //     </PopoverContent>
        // </Popover>

        // <Accordion 
        //     type='single' 
        //     collapsible 
        //     className='relative bg-white z-40 shadow '>
        //     <AccordionItem value='item-1'>
        //         <div className='fixed right-8 w-80 bottom-8 bg-gray-100 border-gray-200 rounded-md overflow:hidden'>
        //             <AccordionTrigger className='px-6 border-b border-zinc-300'>
        //                 <ChatHeader song_info={props.song_info}/>
        //             </AccordionTrigger>
        //             <AccordionContent>
        //                 <div className='flex flex-col h-80'>
        //                     <ChatMessages className = 'px-2 py-3 flex-1'/>
        //                     <ChatInput chatbot_prompt={props.chatbot_prompt} className='px-4' />
        //                 </div>
        //             </AccordionContent>
                    
        //         </div>
        //     </AccordionItem>
        // </Accordion>
        
    );
};

export default ChatPopover;
