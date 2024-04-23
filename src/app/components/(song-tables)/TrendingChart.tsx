
import prisma from '@/lib/db';  
import React from 'react';
import TrendingChartItem from './TrendingChartItem';
import { SongInfo } from '@/lib/validators/song_info';
import { trending_song_slugs } from '@/app/helpers/constants/trending-songs';




const TrendingChart: React.FC = async () => {
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
    <div>
      <div className='font-mono border-t-2 border-b-2 border-gray-400 rounded-md flex items-center justify-center mb-6 p-1'>
        <h2>Trending Chart</h2>
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
    </div>
  );
};

export default TrendingChart;
