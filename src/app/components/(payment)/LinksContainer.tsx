
'use client'
import React from 'react';
import ShareLink from './ShareLink';
import PaymentLink from './PaymentLink';
import { 
    FacebookShareButton, 
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
 } from 'next-share';
 


interface LinksContainerProps {
    // Define your component props here
    song_slug: string;
}

const LinksContainer: React.FC<LinksContainerProps> = (props) => {
    const song_url = `https://www.songmeanings-ai.vercel.app/songs/${props.song_slug}`
    return (
        <div className='flex flex-col items-center  ml-2 '>
            <div className='flex flex-col items-center'>
                <ShareLink />
                <div className='flex  justify-between mb-10'>
                   
                    <FacebookShareButton url={song_url} >
                        <FacebookIcon size={32} round/>
                    </FacebookShareButton>
                    <TwitterShareButton url={song_url} >
                        <TwitterIcon size={32} round/>
                    </TwitterShareButton>
                    <LinkedinShareButton url={song_url} >
                        <LinkedinIcon size={32} round/>
                    </LinkedinShareButton>
                    <RedditShareButton url={song_url} >
                        <RedditIcon size={32} round/>
                    </RedditShareButton>
                    
                </div>
            </div>
          
   
            <div className=''>
                <PaymentLink />
            </div>
        
        </div>
    );
};

export default LinksContainer;
