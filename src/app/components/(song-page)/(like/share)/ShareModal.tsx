'use client'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Share } from 'lucide-react';
import React from 'react';
import ShareContainer from './ShareContainer';
import ShareModalContainer from './ShareModalContainer';
import { SongData } from '@/lib/validators/song_data_response';

interface ShareModalProps {
    song_title: string
    song_slug: string
    song_art_url: string
    song_data: SongData
    // Add any props you need for the ShareModal component
}

const ShareModal: React.FC<ShareModalProps> = (props) => {
    // Add your component logic here
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        // Add your JSX code here
        <>
           
            <Button onPress={onOpen} variant='solid' className='animate-pulse underline text-base bg-purple-300 rounded-full px-1'>
                share this meaning
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                
                <ShareModalContainer song_data={props.song_data} song_art_url={props.song_art_url} song_slug={props.song_slug} song_title={props.song_title} />
                
                )}
            </ModalContent>
            </Modal>
   
      </>
    );
};

export default ShareModal;
