'use client'
import { SongInfo } from '@/lib/validators/song_info';
import React, { Suspense, useEffect, useState } from 'react';
import LoadingQueue from '../../(search-page)/LoadingQueue';
import { SongData } from '@/lib/validators/song_data_response';
import { Song } from 'genius-lyrics';


interface AlternateMeaningFAQContentProps {
    // Define your component props here
    song_data: SongData
  }
  

const AlternateMeaningFAQContent: React.FC<AlternateMeaningFAQContentProps> = (props) => {
    console.log("song meaning content rendered")
    const [streamContent, setStreamContent] = useState<string[]>([]);
    const song_data = props.song_data
    const song_info: SongInfo = {
        song_slug: song_data.song_slug,
        song_title: song_data.song_title,
        artist_name: song_data.artist_name,
        release_date: song_data.release_date || "",
        artist_id: song_data.artist_id,
        header_image_url: song_data.header_image_url,
        song_art_url: song_data.song_image_url,
        genius_id: song_data.genius_id,
        song_short_title: song_data.song_short_title,
        artist_slug: song_data.artist_slug,
        genius_url: song_data.genius_url,


    }
    let first_render = true
    const fetchData = async (song_data: SongData) => {
        try {
            const response = await fetch('/api/faq/queue_alternate_meaning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song_data),
            });

            if (response.body) {
                const reader = response.body.getReader();
                let result = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    const val = new TextDecoder().decode(value);

                    if (val.includes("\n\n")) {
                        console.log("new paragraph")
                    }


                    result += val;
                    const paragraphs = result.split("\n\n")
                    setStreamContent(paragraphs);
                }

                console.log("done")
                const meaning_payload = {
                    song_slug: song_data.song_slug,
                    meaning: result
                }
                try{
                    await fetch('/api/post_song_meaning', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(meaning_payload),
                    });
                    console.log("songmeaning created")
                    }catch(error){
                        console.log("error - songmeaning not created")
                        console.log(error)
                    }
                }
                } catch (error) {
                    console.error('Error:', error);
                }
    };
    useEffect(() => {
        if (first_render) {
            first_render = false;
            console.log("use effect called")
            fetchData(song_data);
        }

    }, []);
    return (
        
        <div>
            {streamContent.length > 0 ? (
                <>
                    {streamContent.map((paragraph, i) => {
                        return (
                            <p key={i} 
                            className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-500">
                                {paragraph}
                            </p>
                        )
                    })}
                </>
            ):(
                <div className='flex items-center justify-center'>
                    <div className='mt-24'>
                        <LoadingQueue songInfo={song_info}/>
                    </div>
                </div>
            )}
            
        </div>
     
    
    );
};

export default AlternateMeaningFAQContent;

