'use client'
import { SongInfo } from '@/lib/validators/song_info';
import React, { Suspense, useEffect, useState } from 'react';
import LoadingQueue from './LoadingQueue';
import { useRouter } from 'next/navigation';



interface SongMeaningContentProps {
    // Define your component props here
    song_info: SongInfo
  }
  

const SongMeaningContent: React.FC<SongMeaningContentProps> = (props) => {
    
    const router = useRouter();
    const handleClick = () => {
        setStreamContent([])
        setIsCutOffError(false)
        first_render = true
        router.refresh()
        fetchData(song_info)

    }
    const [streamContent, setStreamContent] = useState<string[]>([]);
    const [isCutOffError, setIsCutOffError] = useState<boolean>(false);
    const song_info = props.song_info;
    let first_render = true
    const fetchData = async (song_info: SongInfo) => {
        try {

            const response = await fetch('/api/queue_song_meaning', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song_info),
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

       
                const meaning_payload = {
                    song_slug: song_info.song_slug,
                    meaning: result
                }
                if (meaning_payload.meaning.length > 400){
                try{
                    // await fetch('/api/post_song_meaning', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(meaning_payload),
                    // });
             
                    router.refresh()
                    }catch(error){
                    }
                } else {
                    setIsCutOffError(true);
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
            fetchData(song_info);
        }

    }, []);
    return (
        
        <div>
            {streamContent.length > 0 ? (
                <>
                    {streamContent.map((paragraph, i) => {
                        return (
                            <p key={i} 
                            className="text-gray-800 mt-4 text-base sm:text-lg transition duration-300 ">
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
                    <LoadingQueue songInfo={song_info}/>
                    </div>
                </div>
            )}
            
        </div>
     
    
    );
};

export default SongMeaningContent;

