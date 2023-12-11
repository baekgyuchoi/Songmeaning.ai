import { SongData } from '@/lib/validators/song_data_response';
import React from 'react';
import AlternateMeaningFAQContent from './AlternateMeaningFAQContent';
import { PrismaClient } from '@prisma/client';





interface AlternateMeaningFAQContainerProps {
    prompt: string;
    faq_slug: string;
    song_data: SongData;
}
async function GetFAQ(faq_slug: string) {
    
    const prisma = new PrismaClient()
    await prisma.$connect()
    const faq = await prisma.fAQs.findUnique({
      where: {
        faq_slug: faq_slug
      },
    },)
    await prisma.$disconnect()
  
    if (faq == null) {
      console.log("faq not found")
      return null
    }
    return faq
  }

const AlternateMeaningFAQContainer: React.FC<AlternateMeaningFAQContainerProps> = async (props) => {
   
    const faq_in_db = await GetFAQ(props.faq_slug)
    const split_meaning = faq_in_db?.answer.split("\n\n")
    return (
        <div className='text-sm'>
        
        {faq_in_db != null ? (
            <div className='p-4 sm:p-8'>
                {split_meaning?.map((paragraph, index) => (
                <p key={index} className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-800">{paragraph}</p>
                ))}
            </div>
            ):(
            <div className='p-4'>
                <AlternateMeaningFAQContent prompt={props.prompt} faq_slug={props.faq_slug} song_data={props.song_data}  />
            </div>
            )}
        </div>
    );
    };

export default AlternateMeaningFAQContainer;
