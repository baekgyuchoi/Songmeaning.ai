'use client'
import { SongInfo } from '@/lib/validators/song_info';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Genius from 'genius-lyrics'
import { useState } from "react";
import LoadingQueue from './LoadingQueue';
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
    console.log(res)
    return res
}





const ShortSearchButton: React.FC<Props> = (props) => {
    // Define your component logic here
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
    const songInfo = props.songInfo


    return (
        // Return your JSX here
       
            <button
                disabled = {isLoading}
                onClick={buttonClick}
            >
                {isLoading ? (
                    <LoadingQueue songInfo={songInfo}/>
                ) : (
                    <div className="truncate max-w-4xl">{songInfo.song_short_title}</div>
                )}
                
                
            </button>

    );
};

export default ShortSearchButton;
