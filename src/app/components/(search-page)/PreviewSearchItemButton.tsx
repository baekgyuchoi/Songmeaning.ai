'use client'
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Card } from '@/components/ui/card';
import { SongInfo } from '@/lib/validators/song_info';


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






const PreviewSearchItemButton: React.FC<Props> = (props) => {
    // Define your component logic here 

    const songInfo = props.songInfo
    console.log(songInfo)
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
    
            <button className='flex items-center justify-center overflow-hidden mb-1 w-full'
                disabled = {isLoading}
                onClick={buttonClick}
            >
                <Card className='border-1 border-b-2 border-purple-900/25 w-full'>              
                    <div className="flex flex-row w-full p-2 pl-4 pr-4">
                        <div className="group flex items-center gap-x-4 py-1">
                            <div className="relative flex w-8 h-8 overflow-hidden">
                                <img className="object-cover" alt="song art" src={songInfo.song_art_url} />
                            </div>
                            <div className="min-w-0 max-w-md flex items-start flex-col mr-4">
                                <p className="w-48 text-sm truncate flex items-start">{songInfo.song_short_title}</p>
                                <p className="pl-4 text-gray-500 text-xs max-w-md truncate">{songInfo.artist_name}</p>
                            </div>
                        </div>
                        
                    </div>
                </Card>
            </button>

    );
};

export default PreviewSearchItemButton;
