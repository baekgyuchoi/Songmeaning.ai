'use client'
import { SongInfo } from '@/lib/validators/song_info';
import { Pagination, PaginationCursor, PaginationItem } from '@nextui-org/react';
import { PrismaClient } from '@prisma/client';
import { get } from 'http';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface ArtistTotalSongsProps {
    artist_id: number;
    artist_name: string;
}

const ArtistTotalSongs: React.FC<ArtistTotalSongsProps> = async (props) => {
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [songInfoArray, setSongInfoArray] = useState<SongInfo[]>([]);

    

    useEffect(() => {
        const fetchURL = '/api/get_all_artist_songs?artist_id=' + props.artist_id + '&page=' + page + '&artist_name=' + props.artist_name
        const fetchData = async () => {
            try {
                const response = await fetch(fetchURL); // Replace with your API route
                const data = await response.json();
                setSongInfoArray(data!.song_array);
                if (data.has_next_page == false) {
                    setIsLastPage(true);
                }
                return data

            } catch (error) {
                console.error('Error fetching songInfoArray:', error);
                return null
            }
        };

        fetchData();
        
    }, [page]);
    
    return (
        <div>
            <div className='flex items-center justify-between font-mono underline text-gray-800'>
                <button
                    disabled={page == 1}
                    onClick={() => setPage(page - 1)}
                >
                    prev
                </button>
                <button
                    disabled={isLastPage}
                    onClick={() => setPage(page + 1)}
                >
                    next
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
                {songInfoArray.map((song_info, index) => {
                    return (
                        <div key={index} className=''>
                            <Link href={"../songs/" + song_info.song_slug}>
                                <div className='flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-36 w-auto'>
                                    <img
                                        src={song_info.song_art_url}
                                        alt='song art'
                                        className="object-cover rounded-md w-9/10 h-36 w-auto "
                                    />
                                </div>
                                <div className="ml-4 text-xs text-muted-foreground w-4/5 truncate mb-2">
                                    <div className='text-black'>
                                        {song_info.song_short_title}
                                    </div>
                                    <div className=''>
                                        by {song_info.artist_name}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ArtistTotalSongs;
