
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react';
import SearchItemButton from '../(search-page)/SearchItemButton';
import { PrismaClient } from '@prisma/client';
import { SongInfo } from '@/lib/validators/song_info';
import ShortSearchButton from '../(search-page)/ShortSearchButton';
import TrendingChartItem from './TrendingChartItem';
import Link from 'next/link';

interface MoreFromArtistProps {
  // Define your component props here
  artist_slug: string;
  song_slug: string;
  artist_name: string;
  artist_id: number;
}

async function QueueArtist(artist_slug_input: string) {
    const prisma = new PrismaClient()
    const artist_songs = await prisma.songs.findMany({
        where: {
            artist_slug: artist_slug_input
        },
        orderBy: {
          viewCount: "desc",
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
          artist_id: artist_song?.artist_id,
          artist_slug: artist_song?.artist_slug,
          genius_id: artist_song?.genius_id,
          genius_url: artist_song?.genius_url,
          song_short_title: artist_song?.song_short_title,
          header_image_url: artist_song?.header_image_url,
          song_art_url: artist_song?.song_image_url,
          release_date: artist_song?.release_date,
        }
        songs.push(song)
      }
      await prisma.$disconnect()
      return songs
    }else{
      console.log("no artist error")
      await prisma.$disconnect()
      return null
    }
  }

const MoreFromArtist: React.FC<MoreFromArtistProps> = async (props) => {
  // Define your component logic here
    const artist_slug = props.artist_slug
    const song_slug = props.song_slug
    const artist_name = props.artist_name
    let artist_songs = await QueueArtist(artist_slug)
    if (artist_songs == null) {
        artist_songs = []
    }
  

  return (
    // JSX code for your component
    <main className='text-black flex items-center justify-center'>
      
      {(artist_songs.length <= 1) ? (
      <div>
      </div>
      ):(
      <div>
        <div className='rounded-md font-mono border flex items-center justify-center mb-2'>
          <h1>More from <Link className="text-gray-600 underline" href={"/artists/" + artist_slug} > {artist_name} </Link></h1>
        </div>
        <div className='carousel carousel-center carousel-vertical h-96 rounded-box bg-white w-fit flex'>
          
          {/* Add your JSX code here */}
          {artist_songs.map((songInfo, index) => {
            if (songInfo.song_slug != song_slug) {
              
            return (
              <div key={index} className='ml-2'>
                <TrendingChartItem songInfo={songInfo} />
              </div>
            )
          }})}
        </div>
      </div>
      )}
    
    
  </main>
  );
};

export default MoreFromArtist;
