
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
    let done = false
    while (!done) {
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
      
      let is_ft_artist = false
      
      for (let song of data.response.songs) {
        if (song.featured_artists ) {
          for (let ft_artist of song.featured_artists) {
            if (ft_artist.name.includes(artist_name)) {
              is_ft_artist = true
            }
          }
        }
  
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
            header_image_url: song.header_image_url,
            song_art_url: song.song_art_image_url,
            release_date: song.release_date_for_display,
          };
          songInfoArray.push(songInfo)
        }
        
      }
     
     
      if (data.response.next_page == null) {
        console.log("done")
        done = true
      }
      current_page = current_page + 1

      if (current_page > 40) {
        done = true
      }
    }
   
      
    console.log(current_page)
  
  
      
      return songInfoArray;
  }


interface ArtistTotalSongsProps {
    artist_id: number;
    artist_name: string;
    }

const ArtistTotalSongPagination: React.FC<ArtistTotalSongsProps> = async (props) => {
    const songInfoArray = await getArtistSongs(props.artist_id, props.artist_name, 1, 30)
    

    

        return (
            <div>
                
                
                <ScrollArea className='w-full h-screen'>
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
                    {songInfoArray.map((song_info, index) => {
                        return (
                            <div key={index} className='flex items-start'>
                              
                                <ArtistSongItem songInfo={song_info} />
                                
                            </div>
                        );
                    })}
                   
                   
                
                </div>
                </ScrollArea>
            </div>
            
        );
    };



export default ArtistTotalSongPagination;
