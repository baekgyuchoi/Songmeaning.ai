import { SongInfo } from '@/lib/validators/song_info';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

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
            header_image_url: song.header_image_url,
            song_art_url: song.song_image_url,
            release_date: song.release_date,
        };
        return songInfo
    })
    return songInfoArray
}

interface ArtistTopSongCarouselProps {
    artist_slug: string;
}

const ArtistTopSongCarousel: React.FC<ArtistTopSongCarouselProps> = async (props) => {
    const songInfoArray = await GetArtistTopSongs(props.artist_slug)
  return (
    <div className='flex items-center justify-center'>
        <div className='carousel carousel-center bg-gray-100 rounded-box  w-4/5 flex mt-20'>
            {songInfoArray.map((song_info) => (
                    <div 
                    key={song_info.song_slug}
                    className='carousel-item flex-shrink flex flex-col justify-center items-left rounded-md w-40'
                    >
                    <Link href= {"songs/" + song_info.song_slug} >
                    <div className='flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-36 w-auto'>
                        <img
                        src={song_info.song_art_url}
                        alt='song art'
                        className="object-cover rounded-md w-9/10   "
                        />
                    </div>
                    <div className=" ml-4 text-xs text-muted-foreground w-4/5 truncate mb-2">
                        <div className='text-black'>
                        {song_info.song_short_title}
                        </div>
                        <div className=''>
                            by {song_info.artist_name}
                        </div>
                    
                    </div>
                    </Link>
                    </div>
                ))}
        </div>
    </div>
  );
};

export default ArtistTopSongCarousel;
