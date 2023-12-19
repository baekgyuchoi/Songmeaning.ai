'use client'
import { ClipboardCopyIcon, Share, X } from 'lucide-react';
import React, { useEffect } from 'react';
import {Modal, ModalContent, ModalFooter, ModalHeader, ModalBody, useDisclosure, Button} from "@nextui-org/react";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton } from 'next-share';


interface ShareButtonProps {
  // Define any props you need for the ShareButton component
  song_slug: string;
  song_art_url: string;
  song_title: string;
}

const ShareButton: React.FC<ShareButtonProps> = (props) => {
    // Implement the component logic here
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const song_url = `https://songmeaning.ai/songs/${props.song_slug}`
    const [isCopied, setIsCopied] = React.useState(false);
    useEffect(() => {
        setIsCopied(false)
    }, [isOpen])

    return (
        // JSX code for the ShareButton component
        <>
            <button onClick={onOpen} className=' w-full  border-gray-600 border-2 hover:bg-purple-800/25 text-white font-bold py-2 px-8 flex flex-col items-center justify-center rounded-lg'>
                <Share className='text-black' />
                
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            
                <ModalContent className='bg-white border rounded-md'>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <div className=''>
                            
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <p className='text-center font-mono'>
                                    Share this meaning with someone or a community you care about!
                                </p>
                            </div>
                            <div>
                                <div className='flex justify-between mb-10 mx-14 mt-8'>
                        
                                    <FacebookShareButton url={song_url} >
                                        <FacebookIcon size={32} round className=''/>
                                    </FacebookShareButton>
                                    <TwitterShareButton url={song_url} >
                                        <TwitterIcon size={32} round className=''/>
                                    </TwitterShareButton>
                                    <LinkedinShareButton url={song_url} >
                                        <LinkedinIcon size={32} round className=''/>
                                    </LinkedinShareButton>
                                    <RedditShareButton url={song_url} >
                                        <RedditIcon size={32} round/>
                                    </RedditShareButton>
                                    <PinterestShareButton url={song_url} content={`Meaning of song: ${props.song_title}`} name={`Meaning of song: ${props.song_title}`} description={`Meaning of song: ${props.song_title}`} media={props.song_art_url} >
                                        <PinterestIcon size={32} round />
                                    </PinterestShareButton>
                                    
                                </div>
                            </div>
                            <div className='flex flex-row mr-4'>
                                <p className='text-sm'>{song_url}</p>
                                {isCopied? (
                                    <div className='flex items-center'>
                                        <p className='text-xs text-gray-500 font_mono'>copied!</p>
                                    </div>
                                ):(
                                    <button 
                                    className='font_mono text-xs underline'
                                    onClick={() => {
                                        navigator.clipboard.writeText(song_url)
                                        setIsCopied(true)
                                    }}
                                >
                                       
                                        <ClipboardCopyIcon  />
                                </button>
                                )}
                                
                            </div>
                    
                        </ModalBody>
                        <ModalFooter>
                            <Button className='font-mono underline text-xs' onPress={onClose}>
                                close
                            </Button>
                        </ModalFooter>
                    </>
                )}
                </ModalContent>
            
            </Modal>
        </>
    );
};

export default ShareButton;
