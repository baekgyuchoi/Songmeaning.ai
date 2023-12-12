import { SongInfo } from '@/lib/validators/song_info';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';
import ArtistSongItem from './ArtistSongItem';

async function GetArtistTopSongs(artist_slug: string) {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const songs = await prisma.songs.findMany({
        where: {
            artist_slug: artist_slug
        },
        orderBy: {
          viewCount: "desc",
        },
        take: 15,
    });
    await prisma.$disconnect()
    const songInfoArray = songs.map((song) => {
        const songInfo: SongInfo = {
            song_title: song.song_title,
            song_short_title: song.song_short_title,
            genius_url: song.genius_url,
            song_slug: song.song_slug,
            artist_id: song.artist_id,
            genius_id: song.genius_id,
            artist_name: song.artist_name,
            artist_slug: song.artist_slug,
            header_image_url: song.header_image_url || "",
            song_art_url: song.song_image_url || "" ,
            release_date: song.release_date || "",
        };
        return songInfo;
    });
    
    return songInfoArray
}

interface ArtistTopSongCarouselProps extends HTMLAttributes<HTMLDivElement> {
    artist_slug: string;
}

const ArtistTopSongCarousel: React.FC<ArtistTopSongCarouselProps> = async (props, className) => {
    const songInfoArray = await GetArtistTopSongs(props.artist_slug)
  return (
    <div className='flex items-center justify-center w-full'>
        <div className='carousel carousel-center bg-transparent rounded-box  mt-20'>
            {songInfoArray.map((song_info) => (
                    <div 
                    key={song_info.song_slug}
                    className='carousel-item flex-shrink flex flex-col justify-center items-left rounded-md w-40'
                    >
                    <ArtistSongItem songInfo={song_info} />
                    </div>
                ))}
        </div>
    </div>
  );
};

export default ArtistTopSongCarousel;
