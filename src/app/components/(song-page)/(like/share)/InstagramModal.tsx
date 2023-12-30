'use client'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Share } from 'lucide-react';
import React from 'react';
import ShareContainer from './ShareContainer';
import ShareModalContainer from './ShareModalContainer';
import InstagramSquare from './InstagramSquare';
import { InstagramIcon } from 'next-share';
import { SongData } from '@/lib/validators/song_data_response';

interface InstagramModalProps {
    song_data: SongData
    // Add any props you need for the ShareModal component
}

const InstagramModal: React.FC<InstagramModalProps> = (props) => {
    // Add your component logic here
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        // Add your JSX code here
        <>
           
            <Button onPress={onOpen} variant='solid' className=' '>
                <InstagramIcon size={32} round className=''/>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                
                <InstagramSquare song_data={props.song_data} />
                
                )}
            </ModalContent>
            </Modal>
   
      </>
    );
};

export default InstagramModal;
