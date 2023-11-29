


import React, { HTMLAttributes } from 'react';
import SearchItemButton from './(search-page)/SearchItemButton';
import { PrismaClient } from '@prisma/client';
import ShortSearchButton from './(search-page)/ShortSearchButton';
import { SongInfo, SongInfoArraySchema } from '@/lib/validators/song_info';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import Image from "next/image"
import { Card } from '@/components/ui/card';
import Link from 'next/link';


interface TrendingSongsProps extends HTMLAttributes<HTMLDivElement> 
{
  className?: string;
}




async function GetTrendingSongs() {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const trending_songs = await prisma.songs.findMany({
      orderBy: {
        viewCount: "desc",
      },
      take: 15,
    });
    await prisma.$disconnect();
    return trending_songs
  }


const TrendingSongs: React.FC<TrendingSongsProps> = async (className) => {
    // Define your component logic here
    const trending_songs = await GetTrendingSongs()
    const songInfoArray: SongInfo[] = trending_songs.map((song) => {
      const songInfo: SongInfo = {
        song_title: song.song_title,
        song_short_title: song.song_short_title,
        genius_url: song.genius_url,
        song_slug: song.song_slug,
        genius_id: song.genius_id,
        artist_id: song.artist_id,
        artist_name: song.artist_name,
        artist_slug: song.artist_slug,
        header_image_url: song.header_image_url,
        song_art_url: song.song_image_url,
        release_date: song.release_date,
      };
      return songInfo;
    });
    
    return (
        // Return your JSX here
        <div className='w-full md:w-3/5 flex flex-col items-center mt-12'>

          <div className="text-2xl text-gray-800 mb-5 font-mono">
            <p>Trending Songs</p>
          </div>

          <div className='carousel carousel-center bg-gray-100 rounded-box w-full flex'>
           
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
