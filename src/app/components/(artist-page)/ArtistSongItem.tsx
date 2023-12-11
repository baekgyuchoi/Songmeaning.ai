
import { SongInfo } from '@/lib/validators/song_info';
import Link from 'next/link';
import React from 'react';

// make 


interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}



const ArtistSongItem: React.FC<Props> = (props) => {
    // Define your component logic here
    
    const songInfo = props.songInfo
    
    

    return (
        // Return your JSX here 
        
       
            <Link 
                href={"/songs/" + songInfo.song_slug + "?song=" + songInfo.genius_id}
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
            </Link>

    );
};

export default ArtistSongItem;
