import React from 'react';
import { songs_faq_prompts } from '@/app/helpers/constants/songs-faq-prompt';
import { SongInfo } from '@/lib/validators/song_info';
import FAQAlternateMeaning from './FAQAlternateMeaning';
import SongFAQItem from './SongFAQItem';
import { SongData } from '@/lib/validators/song_data_response';
import { PrismaClient } from '@prisma/client';

interface SongFAQProps {
    songData: SongData;
    songMeaning: string;
}



const SongFAQ: React.FC<SongFAQProps> = async (props) => {
    const faq_prompts = songs_faq_prompts
   
    console.log(faq_prompts)
    return (
        <div>
            <div className='w-full  border rounded-md overflow:hidden font-mono flex justify-center mb-4'>
            {/* Your component code here */}
            FAQs for this song
            </div>
            <div className='p-2 font-sans'>
                <div className='p-2 '>
                    <FAQAlternateMeaning 
                        prompt="What is the meaning of this song?"
                        faq_slug={props.songData.song_slug+"_faq_4"}
                        song_data={props.songData}
                        
                    />
                </div>
                {faq_prompts.map((prompt, index) => (
                    <div key={index} className='p-2 '>
                        <SongFAQItem prompt={prompt[0]} question={prompt[1]} song_data={props.songData} faq_slug={props.songData.song_slug+"_faq_"+(index).toString()} />
                    </div>
                ))
                }
            </div>
        </div>
    );
};

export default SongFAQ;
