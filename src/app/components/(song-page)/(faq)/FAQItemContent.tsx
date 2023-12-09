'use client'

import React, { Suspense, useEffect, useState } from 'react';

import { SongData } from '@/lib/validators/song_data_response';

import LoadingFAQ from './LoadingFAQ';
import { FAQ } from '@/lib/validators/FAQ';
import { songs_faq_prompts } from '@/app/helpers/constants/songs-faq-prompt';
import { useRouter } from 'next/navigation'


interface FAQItemContentProps {
    // Define your component props here
    song_data: SongData
    faq_index: number
    faq_slug: string
  }
  

const FAQItemContent: React.FC<FAQItemContentProps> = (props) => {
    console.log("song meaning content rendered")
    const [streamContent, setStreamContent] = useState<string[]>([]);
    const song_data = props.song_data
    const router = useRouter()
    let first_render = true
    const request_body = {"song_data": song_data, "faq_index": props.faq_index}
    const fetchData = async (song_data: SongData) => {
        try {
            const response = await fetch('/api/faq/queue_song_question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request_body),
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
                const meaning_payload: FAQ = {
                    song_slug: song_data.song_slug,
                    question: songs_faq_prompts[props.faq_index][1],
                    answer: result,
                    faq_slug: props.faq_slug,
                    prompt: songs_faq_prompts[props.faq_index][0]
                }
                try{
                    await fetch('/api/faq/post_FAQ_item', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(meaning_payload),
                    });
                    console.log("songmeaning created")
                    router.refresh()
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

export default FAQItemContent;

