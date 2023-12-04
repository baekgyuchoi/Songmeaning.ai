'use client'
import { Card } from '@/components/ui/card';
import { SongInfo } from '@/lib/validators/song_info';
import { Loader2 } from 'lucide-react';
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

async function PostSongToDB(song_info: SongInfo) {
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





const ArtistSongItem: React.FC<Props> = (props) => {
    // Define your component logic here
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const buttonClick = async () => {
        
        const song_exists = await DoesSongExist(props.songInfo.song_slug)
        if (!song_exists) {
            setIsLoading(true);
            await PostSongToDB(props.songInfo);
            
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
                className='w-full overflow-hidden"' 
               
            >
                <div className='flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-36 w-auto'>
                    <img
                    src={songInfo.song_art_url}
                    alt='song art'
                    className="object-cover rounded-md w-9/10 h-36 w-auto "
                    />
                </div>
                <div className=" ml-4 text-xs text-muted-foreground w-4/5 truncate mb-2 flex flex-col items-start pl-3">
                    <div className='text-black'>
                    {songInfo.song_short_title}
                    </div>
                    <div className=''>
                        by {songInfo.artist_name}
                    </div>
                
                </div>
            </button>

    );
};

export default ArtistSongItem;
