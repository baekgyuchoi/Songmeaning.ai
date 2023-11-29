import { SongInfo } from '@/lib/validators/song_info';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import SearchItemButton from '../(search-page)/SearchItemButton';
import BadgeSongItem from './BadgeSongItem';


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
  
  const songInfoArray = songs.map((song) => {
      if (song != null) {
      const songInfo: SongInfo = {
          song_title: song.song_title,
          song_short_title: song.song_short_title,
          genius_url: song.genius_url,
          song_slug: song.song_slug,
          genius_id: song.genius_id,
          artist_name: song.artist_name,
          artist_slug: song.artist_slug,
          header_image_url: song.header_image_url,
          song_art_url: song.song_image_url,
          release_date: song.release_date,
      };
          return songInfo
      }
      })
  
  return songs
}

interface BadgeTopSongsProps {
  // Define your component props here
  badge_name: string;
}

const BadgeTopSongs: React.FC<BadgeTopSongsProps> = async (props) => {
  const songInfoArray = await QueueSong(props.badge_name)
  if (songInfoArray == null) {
    return(
      <div>this badge has no songs!</div>
    )
  }
  return (
  
      
      <div className='mt-4 mb-4 h-96 carousel carousel-center carousel-vertical max-h-md flex w-full'>
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
  
  );
};

export default BadgeTopSongs;
