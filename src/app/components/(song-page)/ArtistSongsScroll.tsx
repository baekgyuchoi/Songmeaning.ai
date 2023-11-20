
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react';
import SearchItemButton from '../(search-page)/SearchItemButton';
import { PrismaClient } from '@prisma/client';
import { SongInfo } from '@/lib/validators/song_info';

interface ArtistSongsScrollProps {
  // Define your component props here
  artist_slug: string;
  song_slug: string;
}

async function QueueArtist(artist_slug_input: string) {
    const prisma = new PrismaClient()
      const artist_songs = await prisma.songs.findMany({
          where: {
              artist_slug: artist_slug_input
          },
      });
      let songs: SongInfo[] = []
      
      if (artist_songs != null) {
        for(let i = 0; i< artist_songs.length; i++){
          let artist_song = artist_songs[i]
          let song: SongInfo = {
            song_slug: artist_song?.song_slug,
            song_title: artist_song?.song_title,  
            artist_name: artist_song?.artist_name, 
            artist_slug: artist_song?.artist_slug,
            genius_id: artist_song?.genius_id,
            genius_url: artist_song?.genius_url,
          }
          songs.push(song)
        }
        return songs
      }else{
        console.log("no artist error")
        return null
      }
  }

const ArtistSongsScroll: React.FC<ArtistSongsScrollProps> = async (props) => {
  // Define your component logic here
    const artist_slug = props.artist_slug
    const song_slug = props.song_slug
    const artist_songs = await QueueArtist(artist_slug)

  return (
    // JSX code for your component
    <ScrollArea className="h-[200px] w-[350px] rounded-mdß p-4">
        <ScrollBar />
        {artist_songs?.map((song, i) => {
        if(song.song_slug != song_slug) {
            return(
                <div key= {i} className='mb-2 flex bg-transparent text-gray font-bold tracking-tight text-xl sm:text-xl hover:text-gray-300 focus:outline-none focus:shadow-outline'>
                <SearchItemButton songInfo={song} />
                </div>
            )
        }
        
        })}
    </ScrollArea>
  );
};

export default ArtistSongsScroll;
