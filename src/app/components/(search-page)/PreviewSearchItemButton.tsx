import { Card } from '@/components/ui/card';
import { SongInfo } from '@/lib/validators/song_info';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}

const PreviewSearchItemButton: React.FC<Props> = (props) => {
    // Define your component logic here 
    const songInfo = props.songInfo

    return (
        // Return your JSX here 

        <Link href={"/songs/" + songInfo.song_slug + "?song=" + songInfo.genius_id} className='flex items-center justify-center overflow-hidden mb-1'>
            <Card className='border-1 border-b-2 border-purple-900/25 w-full '>              
                <div className="flex flex-row w-full p-2 pl-4 pr-4">
                    <div className="group flex items-center gap-x-4 py-1">
                        <div className="relative flex w-8 h-8 overflow-hidden">
                            <Image className="object-cover" alt="song art" src={'/music_placeholder_image.png'} width={150} height={150} />
                        </div>
                        <div className="min-w-0 max-w-md flex items-start flex-col mr-4">
                            <p className="w-48 text-sm truncate">{songInfo.song_short_title}</p>
                            <p className=" text-gray-500 text-xs max-w-md truncate">{songInfo.artist_name}</p>
                        </div>
                    </div>
                    
                </div>
            </Card>
        </Link>

    );
};

export default PreviewSearchItemButton;