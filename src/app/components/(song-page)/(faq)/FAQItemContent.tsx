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
    const [streamContent, setStreamContent] = useState<string[]>([]);
    const [isCutOffError, setIsCutOffError] = useState<boolean>(false);
    const song_data = props.song_data
    const router = useRouter()
    let first_render = true
    const handleClick = () => {
        setStreamContent([])
        setIsCutOffError(false)
        first_render = true
        router.refresh()
        fetchData(song_data)
    }
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

                    result += val;
                    const paragraphs = result.split("\n\n")
                    setStreamContent(paragraphs);
                }

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
                    router.refresh()
                    }catch(error){
                        console.log("error - songmeaning not created")
                        console.log(error)
                    }
                }
                } catch (error) {
                    console.error('Error:', error);
                    setIsCutOffError(true);
                }
    };
    useEffect(() => {
        if (first_render) {
            first_render = false;
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
                            className="text-gray-800 mt-4 transition duration-300">
                                {paragraph}
                            </p>
                        )
                    })}
                    {isCutOffError ? (
                        <div className=' flex items-center justify-center mt-10'>
                            <div className='w-full lg:w-2/3 border-red-400/50 border-2 bg-white rounded-md flex flex-col justify-center items-center'>
                            <p className="text-center text-gray-800 mt-4 text-xs sm:text-base font-mono transition duration-300 ">
                                There was an error generating the response
                            </p>
                          
                            <button
                                onClick={handleClick}
                                className='underline font-bold text-black text-center text-xs sm:text-base font-mono mb-4'
                            >
                                Regenerate
                            </button>
                            </div>
                        </div>
                    ):(
                        <>
                        </>
                    )}
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

