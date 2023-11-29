'use client'
import { Card } from '@/components/ui/card';
import { SongInfo } from '@/lib/validators/song_info';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from "react";
// make 


interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}

// use either useQuery or useMutation later - TO IMPLEMENT
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
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const buttonClick = async () => {
        
        const song_exists = await DoesSongExist(props.songInfo.song_slug)
        if (!song_exists) {
            setIsLoading(true);
            await QueueSongMeaning(props.songInfo);
            
        }
        setIsLoading(false);
        router.push("/songs/" + props.songInfo.song_slug);
    };
    const songInfo = props.songInfo
    
    

    return (
        // Return your JSX here 
        
       
            <button
                disabled = {isLoading}
                onClick={buttonClick}
                className='w-full overflow-hidden' 
               
            >
                <Card className='rounded-box'>
                    {isLoading ? (
                        <div className="truncate max-w-4xl">Loading...</div>
                    ) : (
                        
                        <div className="flex flex-row w-full  p-2 pl-4 pr-4">
                            <div className="group flex items-center gap-x-4 py-3">
                                <div className="relative flex w-12 h-12 overflow-hidden">
                                    <img className="object-cover" src={songInfo.song_art_url} />
                                </div>
                                <div className="min-w-0 max-w-md flex items-start flex-col">
                                    <p className="max-w-sm md:max-w-md truncate">{songInfo.song_short_title}</p>
                                    <p className="pl-4 text-gray-500 text-sm max-w-md truncate">{songInfo.artist_name}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-end w-full hidden md:flex'>
                                <p className="text-gray-500 text-sm truncate">{songInfo.release_date}</p>
                            </div>
                        </div>
                        
                    )}
                    
                </Card>
            </button>

    );
};

export default SearchItemButton;
