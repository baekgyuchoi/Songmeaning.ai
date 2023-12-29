'use client'
import { ClipboardCopyIcon } from 'lucide-react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, RedditShareButton, RedditIcon, PinterestShareButton, PinterestIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'next-share';
import React from 'react';

interface ShareModalContainerProps {
    // Define any props you need for the ShareContainer component
    song_slug: string;
    song_art_url: string;
    song_title: string;
}


const ShareModalContainer: React.FC<ShareModalContainerProps> = (props) => {
    const [isCopied, setIsCopied] = React.useState(false);
    const song_url = `https://songmeaning.ai/songs/${props.song_slug}`
    return (
        <div className='text-black border-1 border-b-2 border-purple-800/25 bg-gray-50 rounded-md flex flex-col items-center p-4 '>
        {/* Add your share container content here */}
            <div className='mt-2'>
                <p className='text-center font-mono'>
                    Share this meaning with someone or a community you care about!
                </p>
            </div>
            <div className='w-full'>
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
            <div className='flex flex-row mr-4 px-2'>
                <p className='text-sm'>{song_url}</p>
                {isCopied? (
                    <div className='flex items-center ml-2 '>
                        <p className='text-xs text-gray-500 font_mono'>copied!</p>
                    </div>
                ):(
                    <button 
                    className='font_mono text-xs underline ml-2 mb-1'
                    onClick={() => {
                        navigator.clipboard.writeText(song_url)
                        setIsCopied(true)
                    }}
                >
                        
                        <ClipboardCopyIcon  />
                </button>
                )}
                
            </div>
        </div>
    );
};

export default ShareModalContainer;
