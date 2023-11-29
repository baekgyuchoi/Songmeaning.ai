
import { Card } from '@/components/ui/card';
import { SongInfo } from '@/lib/validators/song_info';
import Link from 'next/link';

import React from 'react';
import Image from 'next/image';

import SongBadges from '../(song-page)/SongBadges';
import { SongData } from '@/lib/validators/song_data_response';
// make 


interface Props {
    // Define the props for your component here
    songData: SongData
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





const BadgeSongItem: React.FC<Props> = (props) => {
    // Define your component logic here
    
    
    
   
    const songData = props.songData

    
    
    

    return (
        // Return your JSX here 
        
       
            <Link
                href = {"/songs/" + songData.song_slug}
                className='w-full overflow-hidden' 
               
            >
                <Card className='rounded-box w-full'>
                    
                        
                        <div className="flex flex-row w-full  p-2 pl-4 pr-4">
                            <div className="group flex items-center gap-x-4 py-3">
                                <div className="relative flex w-12 h-12 overflow-hidden">
                                    <img alt="song image" className="object-cover" src={songData.song_image_url} />
                                </div>
                                <div className='flex flex-col '>

                                
                                <div className="min-w-0 max-w-md flex flex-shrink items-start flex-col ">
                                    <p className="overflow-hidden max-w-sm truncate">{songData.song_title}</p>
                                </div>
                                <div className='flex flex-row  '>
                                    
                                    
                                        <SongBadges songData={songData} />
                                    
                                </div>
                               
                                </div>
                            </div>

                        
                        </div>
                        
                    
                    
                </Card>
            </Link>

    );
};

export default BadgeSongItem;
