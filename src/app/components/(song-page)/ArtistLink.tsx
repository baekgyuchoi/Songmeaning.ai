'use client'

import { Artist } from '@/lib/validators/artist';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

async function DoesArtistExist(artist_slug: string) {
    const url = '/api/does_artist_exist?q=' + artist_slug
    const res = await fetch(url)
    const data = await res.json()
    return data['song_exists']
}

async function PostArtistToDB(artist: Artist) {
    const url = '/api/post_artist'
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(artist),
    })
    return res
}

interface ArtistLinkProps {
    // Define your component props here
    artist_slug: string;
    artist_id: number;
    artist_name: string
}


const ArtistLink: React.FC<ArtistLinkProps> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const artist: Artist = {
        genius_id: props.artist_id,
        name: props.artist_name,
        artist_slug: props.artist_slug,
    };

    const buttonClick = async () => {
        
        const song_exists = await DoesArtistExist(props.artist_slug)
        console.log(song_exists)
        if (!song_exists) {
            setIsLoading(true);
            await PostArtistToDB(artist);
            
        }
        setIsLoading(false);
        router.push("/artists/" + props.artist_slug);
    };
    return (
        <div className='flex items-center justify-center'>
            <button
                disabled = {isLoading}
                onClick={buttonClick}
                className='w-full overflow-hidden' 
               
            >
                {isLoading ? (
                        <div className='flex items-center justify-center'>
                        <Loader2 className="animate-spin" size={16} />
                        </div>
                    ) : (
                        
                        <div className="text-gray-600 underline">
                            {props.artist_name}
                        </div>
                        
                    )}
            </button>
      
        </div>
    );
};

export default ArtistLink;
