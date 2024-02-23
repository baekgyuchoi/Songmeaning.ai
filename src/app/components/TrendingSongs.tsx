


import React, { HTMLAttributes } from 'react';
import prisma from '@/lib/db';
import { trending_song_slugs } from '../helpers/constants/trending-songs';
import { SongInfo, SongInfoArraySchema } from '@/lib/validators/song_info';
import Link from 'next/link';


interface TrendingSongsProps extends HTMLAttributes<HTMLDivElement> 
{
  className?: string;
}







const TrendingSongs: React.FC<TrendingSongsProps> = async (className) => {
    // Define your component logic here
    const songInfoArray: SongInfo[] = []
    const trending_songs = await prisma.songs.findMany({
      orderBy: {
        viewCount: "desc",
      },
      take: 15,
    });


    if (trending_songs != null) {
      for(let i = 0; i< trending_songs.length; i++){
        let trending_song = trending_songs[i]
        let song: SongInfo = {
          song_slug: trending_song?.song_slug,
          song_title: trending_song?.song_title,  
          artist_name: trending_song?.artist_name, 
          artist_id: trending_song?.artist_id,
          artist_slug: trending_song?.artist_slug,
          genius_id: trending_song?.genius_id,
          genius_url: trending_song?.genius_url,
          song_short_title: trending_song?.song_short_title,
          header_image_url: trending_song.header_image_url || "",
          song_art_url: trending_song.song_image_url || "",
          release_date: trending_song.release_date || "",
        }
        songInfoArray.push(song)
      }
    }

    
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
