'use client'
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { Share } from 'lucide-react';
import React from 'react';
import ShareContainer from './ShareContainer';
import ShareModalContainer from './ShareModalContainer';

interface ShareModalProps {
    song_title: string
    song_slug: string
    song_art_url: string
    // Add any props you need for the ShareModal component
}

const ShareModal: React.FC<ShareModalProps> = (props) => {
    // Add your component logic here
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isCopied, setIsCopied] = React.useState(false);
    const song_url = `https://songmeaning.ai/songs/${props.song_slug}`
    return (
        // Add your JSX code here
        <>
           
            <Button onPress={onOpen} className='animate-pulse'>
                <Share />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                
                <ShareModalContainer song_art_url={props.song_art_url} song_slug={props.song_slug} song_title={props.song_title} />
                
                )}
            </ModalContent>
            </Modal>
   
      </>
    );
};

export default ShareModal;
