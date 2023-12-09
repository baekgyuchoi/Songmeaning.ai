'use client'
import { SongInfo } from '@/lib/validators/song_info';
import React, { Suspense, useEffect, useState } from 'react';
import LoadingQueue from '../../(search-page)/LoadingQueue';
import { SongData } from '@/lib/validators/song_data_response';
import { Song } from 'genius-lyrics';
import LoadingFAQ from './LoadingFAQ';
import { FAQ } from '@/lib/validators/FAQ';


interface AlternateMeaningFAQContentProps {
    // Define your component props here
    song_data: SongData
    faq_slug: string
    prompt: string
  }
  

const AlternateMeaningFAQContent: React.FC<AlternateMeaningFAQContentProps> = (props) => {
    console.log("song meaning content rendered")
    const [streamContent, setStreamContent] = useState<string[]>([]);
    const song_data = props.song_data
   
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

     
                const meaning_payload: FAQ = {
                    "song_slug": song_data.song_slug,
                    "faq_slug": props.faq_slug,
                    "question": props.prompt,
                    "answer": result,
                    "prompt": "given the song meaning and lyrics above, give an alternate meaning for the song that is qualitatively different from the given song meaning. Give a summary analysis paragraph (of how this alternate meaning is different), emotional journey paragraph (delve into a different take from the song meaning given above on an emotional journey this song can take the audience on), quote analysis (pull quotes as evidence to back up your alternate meaning), and conclusion (concluding upon the alternate meaning's outlook and insights gained) :\n\n"               
                }
     
                const res = await fetch('/api/faq/post_alternate_meaning', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(meaning_payload),
                });
                console.log(res)
                
                    
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
                            className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-800">
                                {paragraph}
                            </p>
                        )
                    })}
                </>
            ):(
                <div className='flex items-center justify-center'>
                    <div className='mt-24'>
                        <LoadingFAQ />
                    </div>
                </div>
            )}
            
        </div>
     
    
    );
};

export default AlternateMeaningFAQContent;

