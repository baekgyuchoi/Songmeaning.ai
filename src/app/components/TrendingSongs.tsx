


import React, { HTMLAttributes } from 'react';
import prisma from '@/lib/db';
import { trending_song_data } from '../helpers/constants/trending-songs';
import { SongInfo, SongInfoArraySchema } from '@/lib/validators/song_info';
import Link from 'next/link';


interface TrendingSongsProps extends HTMLAttributes<HTMLDivElement> 
{
  className?: string;
}







const TrendingSongs: React.FC<TrendingSongsProps> = async (className) => {
    // Define your component logic here
    const songInfoArray = trending_song_data
    
    
    return (
        // Return your JSX here
        <div className='w-full md:w-3/5 flex flex-col items-center mt-12'>

          <div className="text-l md:text-2xl text-gray-500 mb-5 font-mono">
            <p>Trending Songs</p>
          </div>

          <div className='carousel carousel-center  rounded-box w-full flex'>
           
            {songInfoArray.map((song_info) => (
                <div 
                  key={song_info.song_slug}
                  className='carousel-item flex-shrink flex flex-col justify-center items-left rounded-md w-40'
                >
                  <Link href= {"songs/" + song_info.song_slug} >
                  <div className='flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-36 w-auto'>
                    <img
                      src={song_info.song_art_url}
                      alt='song art'
                      className="object-cover rounded-md w-9/10   "
                    />
                  </div>
                  <div className=" ml-4 text-xs text-muted-foreground w-4/5 truncate mb-2">
                    <div className='text-black'>
                    {song_info.song_short_title}
                    </div>
                    <div className=''>
                        by {song_info.artist_name}
                    </div>
                   
                  </div>
                  </Link>
                </div>
              ))}
          </div>


          
     
        </div>
        
    );
};

export default TrendingSongs;
