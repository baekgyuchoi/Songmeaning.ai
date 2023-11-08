'use client'
import { SongInfo } from '@/lib/validators/song_info';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}



const SearchItemButton: React.FC<Props> = (props) => {
    // Define your component logic here
    const router = useRouter();
    const buttonClick = () => {
        console.log("button clicked");
        router.push("/songs/" + props.songInfo.song_slug);
    };
    const songInfo = props.songInfo

    return (
        // Return your JSX here
        <div>
            <button
                onClick={buttonClick}
                className="bg-transparent text-gray font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline">
                {songInfo.song_title}
            </button>
        </div>
    );
};

export default SearchItemButton;
