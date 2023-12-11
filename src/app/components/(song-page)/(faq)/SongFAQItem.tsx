
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SongData } from '@/lib/validators/song_data_response';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import FAQItemContent from './FAQItemContent';
import SongBadges from '../SongBadges';
import { Badge } from '@/components/ui/badge';


interface SongFAQItemProps {
    prompt: string;
    faq_slug: string;
    song_data: SongData;
    question: string;
}

async function GetFAQ(faq_slug: string) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  const faq = await prisma.fAQs.findUnique({
    where: {
      faq_slug: faq_slug
    }
  })
  await prisma.$disconnect()

  if (faq == null) {
    console.log("faq not found")
    return null
  }
  return faq
}

const SongFAQItem: React.FC<SongFAQItemProps> = async (props) => {
 
  const faq_index = parseInt(props.faq_slug.split("_faq_")[1])
  const faq_in_db = await GetFAQ(props.faq_slug)
  const split_meaning = faq_in_db?.answer.split("\n\n")
  let question = props.question
  
 
  
  return (
    <div>
      {/* Your component code here */}
      <Accordion 
            type='single' 
            collapsible 
            className=' font-mono '>
            <AccordionItem value='item-1'>
                <div className='w-full   rounded-md overflow:hidden  '>
                    <AccordionTrigger className='px-6 rounded-md border-1 border-b-2 border-purple-900/25 font-mono truncate'>
                      <div className='flex justify-start'>
                        <div className='mr-2'>{question}</div>
                       
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='font-sans text-base sm:text-lg'>
                      {faq_in_db != null ? (
                        <div className='p-4 sm:p-8 '>
                          {split_meaning?.map((paragraph, index) => (
                            <p key={index} className="text-gray-800 mt-4  transition duration-300 ">{paragraph}</p>
                          ))}
                        </div>
                      ) : (
                        <div className='p-4 sm:p-8'>
                          <FAQItemContent song_data={props.song_data} faq_index={faq_index} faq_slug={props.faq_slug} />
                        </div>
                      )}
                      
                        
                    </AccordionContent>
                    
                </div>
            </AccordionItem>
        </Accordion>
    </div>
  );
};

export default SongFAQItem;
