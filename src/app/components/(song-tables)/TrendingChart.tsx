
import prisma from '@/lib/db';  
import React from 'react';
import TrendingChartItem from './TrendingChartItem';
import { SongInfo } from '@/lib/validators/song_info';
import { trending_song_data, trending_song_ids } from '@/app/helpers/constants/trending-songs';




const TrendingChart: React.FC = async () => {
  const songInfoArray = trending_song_data
  

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
