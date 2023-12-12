
import { ScrollArea } from '@/components/ui/scroll-area';
import { SongInfo } from '@/lib/validators/song_info';
import { Pagination, PaginationCursor, PaginationItem } from '@nextui-org/react';
import { PrismaClient } from '@prisma/client';
import { get } from 'http';
import Link from 'next/link';
import React from 'react';
import ArtistSongItem from './ArtistSongItem';

export const maxDuration = 300 


async function getArtistSongs(artist_id: number, artist_name: string, current_page: number, per_page: number) {

    
  let songInfoArray: SongInfo[] = []
 
  const geniusAPIArtistURL = 'https://api.genius.com/artists/'+ artist_id +"/songs"+"?" + "sort=title&per_page=" + per_page + "&page=" + current_page
  const response = await fetch(geniusAPIArtistURL, {
      headers: {
          'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY_1
      },
      
  });
  if (!response.ok) {
      throw new Error('failed to fetch data');
  }
  const data = await response.json();
  
  for (let song of data.response.songs) {
    

    if ((song.primary_artist.name.includes(artist_name)) ) {
      const songInfo: SongInfo = {
        song_title: song.full_title,
        song_short_title: song.title,
        genius_url: song.url,
        song_slug: song.path.split('/').pop()?.split('-lyrics')[0].split('-annotated')[0],
        genius_id: parseInt(song.id),
        artist_name: song.primary_artist.name,
        artist_id: parseInt(song.primary_artist.id),
        artist_slug: song.primary_artist.url.split('/').pop(),
        header_image_url: song.header_image_url || "",
        song_art_url: song.song_art_image_url || "",
        release_date: song.release_date_for_display || "",
      };
      songInfoArray.push(songInfo)
    }
    
  }
  
  
  
  


    
  console.log(current_page)


    
    return {songInfoArray: songInfoArray, is_last_page: data.response.next_page == null};
}


interface ArtistTotalSongsProps {
    artist_id: number;
    artist_name: string;
    artist_slug: string;
    page: number;
    }

const ArtistTotalSongs: React.FC<ArtistTotalSongsProps> = async (props) => {
    const response = await getArtistSongs(props.artist_id, props.artist_name, props.page, 30)
    const songInfoArray = response.songInfoArray
    let prev_disabled = false
    let next_disabled = false

    if (props.page == 1) {
      prev_disabled = true
    }
    if (response.is_last_page) {
      next_disabled = true
    }
    

        return (
            <div>
                
                
              <div className="flex justify-between font-mono ml-3 mr-3 sm:mr-10 mb-2">
                {prev_disabled ? <div className="text-gray-400">prev</div> : <Link scroll={false} href={`/artists/${props.artist_slug}?page=${props.page - 1}`}>prev</Link>}
                {next_disabled ? <div className="text-gray-400">next</div> : <Link scroll={false} href={`/artists/${props.artist_slug}?page=${props.page + 1}`}>next</Link>}
              </div>
              <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
                {songInfoArray.map((song_info, index) => {
                    return (
                        <div key={index} className=''>
                          
                            <ArtistSongItem songInfo={song_info} />
                            
                        </div>
                    );
                })}

              </div>
            </div>
            
        );
    };



export default ArtistTotalSongs;
