


import React from 'react';
import SearchItemButton from './(search-page)/SearchItemButton';
import { PrismaClient } from '@prisma/client';
import ShortSearchButton from './(search-page)/ShortSearchButton';


interface Props {
    // Define the props for your component here
}

async function GetTrendingSongs() {
    const prisma = new PrismaClient();
    await prisma.$connect();
    const trending_songs = await prisma.songs.findMany({
      orderBy: {
        viewCount: "desc",
      },
      take: 10,
    });
    return trending_songs
  }


const TrendingSongs: React.FC<Props> = async ({ /* Destructure your props here */ }) => {
    // Define your component logic here
    const trending_songs = await GetTrendingSongs()
    return (
        // Return your JSX here
        <div className=' flex flex-col items-center '>
          <h1 className="text-3xl text-gray-800 mb-5">
            Trending Songs
          </h1>
          <ul className="">
            {trending_songs.map((result, index) => (
              <li 
                key={index}
                className="py-2 w-full flex flex-col flex-row "
              >
                <div className="flex justify-center bg-transparent text-black font-bold tracking-tight truncate-max-w-l text-md sm:text-md  hover:text-gray-300 focus:outline-none focus:shadow-outline">
                  <SearchItemButton songInfo={result} />
                </div>
              </li>
            ))}
          </ul>
        </div>

    );
};

export default TrendingSongs;
