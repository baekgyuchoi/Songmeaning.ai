'use client'
import { SongInfo } from '@/lib/validators/song_info';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as Genius from 'genius-lyrics'
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
    const url = '/api/queue_song_meaning'
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



const Button = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // do something async
    setIsLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      Click me!
    </button>
  );
};


const SearchItemButton: React.FC<Props> = (props) => {
    // Define your component logic here
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const buttonClick = async () => {
        console.log("button clicked");
        setIsLoading(true);
        const song_exists = await DoesSongExist(props.songInfo.song_slug)
        if (!song_exists) {
            const queue_response = await QueueSongMeaning(props.songInfo);
            console.log("song meaning queued")
            console.log(queue_response)
        }
        setIsLoading(false);
        router.push("/songs/" + props.songInfo.song_slug);
    };
    const songInfo = props.songInfo


    return (
        // Return your JSX here
        <div>
            <button
                disabled = {isLoading}
                onClick={buttonClick}
                className="bg-transparent text-gray font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline">
                {isLoading ? (
                    <>loading...</>
                ) : (
                    <div className="truncate max-w-4xl">{songInfo.song_title}</div>
                )}
                
                
            </button>
        </div>
    );
};

export default SearchItemButton;
