
import { SongInfo } from '@/lib/validators/song_info';
import Image from 'next/image';
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
                className='w-full overflow-hidden flex flex-col items-center ' 
               
            >
                <div className=' flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-36 w-auto'>
                    <Image
                    src={songInfo.song_art_url!}
                    alt='song art'
                    className="object-cover rounded-md w-9/10 h-36 w-auto "
                    width={150}
                    height={150}
                    />
                </div>
                <div className=" text-xs text-left text-muted-foreground w-36 truncate mb-2 flex flex-col items-start justify-center ">
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
