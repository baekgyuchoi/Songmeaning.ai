
import { SongInfo } from '@/lib/validators/song_info';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TrendingChartItemProps {
    songInfo: SongInfo;
}

const TrendingChartItem: React.FC<TrendingChartItemProps> = ({ songInfo }) => {

    return (
        <Link href={`/songs/${songInfo.song_slug}`}>
            
            <div className="flex flex-row w-full  w-72 truncate">
                <div className="group flex items-center gap-x-4 py-3">
                        <div className="relative flex w-12 h-12 overflow-hidden rounded-md">
                                <img  alt="song art" className="object-cover" src={songInfo.song_art_url} />
                        </div>
                        <div className="min-w-0 max-w-md">
                                <p className="w-72 truncate">{songInfo.song_short_title}</p>
                                <p className="text-gray-500 text-sm truncate">{songInfo.artist_name}</p>
                        </div>
                </div>
                
            </div>
        
        </Link>
    );
};

export default TrendingChartItem;
