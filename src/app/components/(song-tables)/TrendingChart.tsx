
import { PrismaClient } from '@prisma/client';
import React from 'react';
import TrendingChartItem from './TrendingChartItem';
import { SongInfo } from '@/lib/validators/song_info';


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

const TrendingChart: React.FC = async () => {
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
    <main>
      <div className='font-mono rounded-md border flex items-center justify-center mb-2'>
        <h1>Trending Chart</h1>
      </div>
      <div className='carousel carousel-center carousel-vertical h-96 rounded-box bg-white w-fit flex'>
        
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
