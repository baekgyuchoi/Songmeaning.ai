import { SongInfo } from '@/lib/validators/song_info';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import SearchItemButton from '../(search-page)/SearchItemButton';
import BadgeSongItem from './BadgeSongItem';
import Link from 'next/link';


async function QueueSong(badge_name: string) {
  const prisma = new PrismaClient()
  const top_many_songs = 20

  const badge = await prisma.badges.findUnique({
      where: {
          badge_name: badge_name
      }
  })
  if (badge == null) {
    return null
  }
  const badgesOnSongs = await prisma.badgesOnSongs.findMany({
      where: {
          badge_id: badge?.id
      },
      orderBy: {
          song: {
              viewCount: "desc"
          }
      }
  });
  
  let songs = []

  for (let i = 0; i < Math.min(badgesOnSongs.length, top_many_songs); i++) {
      let badgeOnSong = badgesOnSongs[i]
      const song = await prisma.songs.findUnique({
          where: {
              id: badgeOnSong.song_id,
          },
          include: {
              badges: true,
              song_meaning: true,
          }
      })
      songs.push(song)
  }
  
  if (songs == null || songs[0] == null ) {
      console.log("badge has no songs error")
      await prisma.$disconnect()
      return null
  }
  console.log(songs)

  await prisma.$disconnect()
  
  
  return songs
}

interface BadgeTopSongsProps {
  // Define your component props here
  badge_name: string;
}

const BadgeTopSongs: React.FC<BadgeTopSongsProps> = async (props) => {
  const songInfoArray = await QueueSong(props.badge_name)
  if (songInfoArray == null || songInfoArray[0] == null) {
    return(
      <div>this badge has no songs!</div>
    )
  }
  return (
    <div className='w-full container flex flex-col'>
    <div className='w-full flex flex-col items-center min-w-screen mt-12'>

        <div className="text-2xl text-gray-800 mb-5 font-mono">
        <p>Top Songs in Badge</p>
        </div>

        <div className='bg-gray-100 rounded-box flex flex-col items-start w-full'>
            <div className='carousel carousel-center w-auto flex'>
            {songInfoArray.map((songInfo, index) => {
            if (songInfo == null) {
                return(
                    <>No Songs in Badge</>
                )
            }
                return (
                    <div 
                    key={songInfo.song_slug}
                    className='carousel-item flex-shrink flex flex-col justify-center items-left rounded-md w-40'
                    >
                    <Link href= {"../../songs/" + songInfo.song_slug} >
                        <div className='flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-36 w-auto'>
                            <img
                                src={songInfo.song_image_url}
                                alt='song art'
                                className="object-cover rounded-md w-9/10   "
                            />
                        </div>
                        <div className=" ml-4 text-xs text-muted-foreground w-4/5 truncate mb-2">
                            <div className='text-black'>
                            {songInfo.song_short_title}
                            </div>
                            <div className=''>
                                by {songInfo.artist_name}
                            </div>
                        
                        </div>
                    </Link>
                </div>
                );
            })}
        
            </div>
        </div>
        </div>
      <div className='mt-20 flex items-center justify-center'>
        <div className='text-2xl text-gray-800 mb-5 font-mono'>
          <p>Top Songs in Badge</p>
        </div>
      </div>
      <div className='mt-4 mb-4 h-96 carousel carousel-center carousel-vertical max-h-md flex w-full md:w-1/2'>
        {songInfoArray.map((songInfo, index) => {
          if (songInfo == null) {
              return(
                  <>No Songs in Badge</>
              )
          }
            return (
                <div key={index} className=' mt-4  flex-shrink w-full truncate'>
                    <BadgeSongItem songData={songInfo} />
                </div>
            );
        })}
                                                    
      </div>
    </div>
  );
};

export default BadgeTopSongs;
