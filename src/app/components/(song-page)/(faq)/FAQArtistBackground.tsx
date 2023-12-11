
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SongData } from '@/lib/validators/song_data_response';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import AlternateMeaningFAQContent from './AlternateMeaningFAQContent';
import AlternateMeaningFAQContainer from './AlternateMeaningFAQContainer';


interface SongFAQItemProps {
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
    }
  })
  await prisma.$disconnect()

  if (faq == null) {
    console.log("faq not found")
    return null
  }
  return faq
}

const FAQArtistBackground: React.FC<SongFAQItemProps> = async (props) => {
  const question = "Artist Background"
  
  
  return (
    <div>
      {/* Your component code here */}
      <Accordion 
            type='single' 
            collapsible 
            className=' font-mono '>
            <AccordionItem value='item-1'>
                <div className='w-full  border rounded-md overflow:hidden  '>
                    <AccordionTrigger className='px-6 border-b border-zinc-300 font-mono truncate'>
                        {question}
                    </AccordionTrigger>
                    <AccordionContent className='font-sans'>
                      <AlternateMeaningFAQContainer prompt={props.prompt} faq_slug={props.faq_slug} song_data={props.song_data}  />
                      {/* //REGENERATE FAQ BUTTON IN FUTURE */}
                    </AccordionContent>
                    
                </div>
            </AccordionItem>
        </Accordion>
    </div>
  );
};

export default FAQArtistBackground;
