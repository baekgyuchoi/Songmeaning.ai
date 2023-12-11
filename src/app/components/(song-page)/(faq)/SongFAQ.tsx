import React from 'react';
import { songs_faq_prompts } from '@/app/helpers/constants/songs-faq-prompt';
import { SongInfo } from '@/lib/validators/song_info';
import FAQAlternateMeaning from './FAQAlternateMeaning';
import SongFAQItem from './SongFAQItem';
import { SongData } from '@/lib/validators/song_data_response';
import { PrismaClient } from '@prisma/client';
import FAQArtistBackground from './FAQArtistBackground';

interface SongFAQProps {
    songData: SongData;
    songMeaning: string;
}



const SongFAQ: React.FC<SongFAQProps> = async (props) => {
    const faq_prompts = songs_faq_prompts
   
  
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='w-screen sm:w-full border rounded-md overflow:hidden font-mono text-lg flex justify-center mb-4'>
            {/* Your component code here */}
            FAQ
            </div>
            <div className='w-screen sm:w-full  pt-2 pb-2 text-xs sm:text-sm md:text-lg'>
                <div className='pt-2 pb-2 md:pl-2 md:pr-2 '>
                    <FAQArtistBackground 
                        prompt="Can you provide background information about (Artist name)? Including details about their early life/family background, dating life, career beginnings and career progression, notable achievements, notable controversies, fun facts, details of personal life that only the most fervent fans would be aware of, significant albums or songs, and any impact or influence they've had on the music industry or culture? Please do not feel limited and go as deep into the weeds as possible.  For example, if you were discussing Enya you would want to include details of how she decorates her castle, details of her attempted kidnappings, how and why she does not tour.  For Taylor Swift you would want to discuss her notable controversies in detail such as how kanye came on stage. Please also include 3-5 important quotes from the artist about their career, philosophy or anything that speaks to them as a person."
                        faq_slug={props.songData.artist_slug+"_faq_5"}
                        song_data={props.songData}
                        
                    />
                </div>
                <div className='pt-2 pb-2 md:pl-2 md:pr-2 '>
                    <FAQAlternateMeaning 
                        prompt="What is the meaning of this song?"
                        faq_slug={props.songData.song_slug+"_faq_4"}
                        song_data={props.songData}
                        
                    />
                </div>
                {faq_prompts.map((prompt, index) => (
                    <div key={index} className='pt-2 pb-2 md:pl-2 md:pr-2 '>
                        <SongFAQItem prompt={prompt[0]} question={prompt[1]} song_data={props.songData} faq_slug={props.songData.song_slug+"_faq_"+(index).toString()} />
                    </div>
                ))
                }
            </div>
        </div>
    );
};

export default SongFAQ;
