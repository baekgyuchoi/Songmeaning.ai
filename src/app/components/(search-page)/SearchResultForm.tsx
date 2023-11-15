'use client'
import { GenerateSongMeaning, IsSongInDB } from '@/app/actions';
import { SongInfo } from '@/lib/validators/song_info';
import React from 'react';





interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}

const SearchResultForm: React.FC<Props> = async (props) => {
    const buttonClick = async() => {
        console.log("button cliked - server action")
        await GenerateSongMeaning(props.songInfo)
    }
   
    const songInfo = props.songInfo
    return (
        // Return your JSX here
        <div>
            <button
                onClick = {buttonClick}
                className="bg-transparent text-gray font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline"
            >
                {songInfo.song_title}
            </button>
        </div>
    );
};

export default SearchResultForm;
