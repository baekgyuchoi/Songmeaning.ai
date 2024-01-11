
import prisma from '@/lib/db';  
import React from 'react';
import TrendingChartItem from './TrendingChartItem';
import { SongInfo } from '@/lib/validators/song_info';
import { trending_song_ids } from '@/app/helpers/constants/trending-songs';




const TrendingChart: React.FC = async () => {
  const songInfoArray: SongInfo[] = []
    for (let id of trending_song_ids) {
      const song = await prisma.songs.findUnique({
        where: {
          genius_id: id,
        },
      });
      if (song) {
        const song_info: SongInfo = {
          song_slug: song.song_slug,
          song_art_url: song.song_image_url!,
          song_short_title: song.song_short_title,
          artist_name: song.artist_name,
          song_title: song.song_title,
          artist_slug: song.artist_slug,
          genius_url: song.genius_url,
          artist_id: song.artist_id,
          genius_id: song.genius_id,
          header_image_url: song.header_image_url!,
          release_date: song.release_date!,
        }

        
        songInfoArray.push(song_info)
      }
    }

  

  return (
    <main>
      <div className='font-mono border-t-2 border-b-2 border-gray-400 rounded-md flex items-center justify-center mb-6 p-1'>
        <h1>Trending Chart</h1>
      </div>
      <div className='carousel carousel-center carousel-vertical h-96 rounded-box bg-white w-full flex'>
        
        {/* Add your JSX code here */}
        {songInfoArray.map((songInfo,index) => {
          return (
            <div key={index} className='ml-2'>
              <TrendingChartItem songInfo={songInfo} />
            </div>
          )
        })}
      </div>
    </main>
  );
};

export default TrendingChart;
