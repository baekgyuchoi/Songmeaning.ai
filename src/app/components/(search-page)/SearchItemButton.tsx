'use client'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Card } from '@/components/ui/card';
import { SongInfo } from '@/lib/validators/song_info';

import Link from 'next/link';

import React from 'react';

// make 


interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}

async function DoesSongExist(song_slug: string) {
    const url = '/api/does_song_exist?q=' + song_slug
    const res = await fetch(url)
    const data = await res.json()
    return data['song_exists']
}

async function QueueSongMeaning(song_info: SongInfo) {
    const url = '/api/post_song'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(song_info),
    })
    return res
}







const SearchItemButton: React.FC<Props> = (props) => {
    // Define your component logic here 

    const songInfo = props.songInfo
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const buttonClick = async () => {
        console.log("button clicked");
        
        const song_exists = await DoesSongExist(props.songInfo.song_slug)
        if (!song_exists) {
            setIsLoading(true);
            await QueueSongMeaning(props.songInfo);
            
        }
        setIsLoading(false);
        router.push("/songs/" + props.songInfo.song_slug);
    };

    return (
        // Return your JSX here 
    
            <button
                disabled = {isLoading}
                onClick={buttonClick}
                className='w-full overflow-hidden'

            >   
                <Card className='border-1 border-b-2 border-purple-900/25 '>              
           
                    {isLoading ? (
                        <div className="flex flex-row w-full  p-2 pl-4 pr-4">
                            <div className="group flex items-center gap-x-4 py-3">
                                <div className="relative flex w-12 h-12 overflow-hidden">
                                    <Loader2 className="animate-spin-slow text-purple-500" />
                                </div>
                                <div className="min-w-0 max-w-md flex items-start flex-col">
                                    <p className="w-52 sm:w-96 md:max-w-md truncate flex items-start">{songInfo.song_short_title}</p>
                                    <p className="pl-4 text-gray-500 text-sm max-w-md truncate">{songInfo.artist_name}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end w-full hidden sm:flex'>
                                <p className="text-gray-500 text-sm truncate">{songInfo.release_date}</p>
                            </div>
                        </div>
                        ):(
                            <div className="flex flex-row w-full  p-2 pl-4 pr-4">
                                <div className="group flex items-center gap-x-4 py-3">
                                    <div className="relative flex w-12 h-12 overflow-hidden">
                                        <img className="object-cover" alt="song art" src={songInfo.song_art_url} />
                                    </div>
                                    <div className="min-w-0 max-w-md flex items-start flex-col">
                                        <p className="w-52 sm:w-96 md:max-w-md truncate flex items-start">{songInfo.song_short_title}</p>
                                        <p className="pl-4 text-gray-500 text-sm max-w-md truncate">{songInfo.artist_name}</p>
                                    </div>
                                </div>
                                <div className='flex items-center justify-end w-full hidden sm:flex'>
                                    <p className="text-gray-500 text-sm truncate">{songInfo.release_date}</p>
                                </div>
                            </div>
                        )}

                </Card>
            </button>

    );
};

export default SearchItemButton;
