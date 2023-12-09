
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SongData } from '@/lib/validators/song_data_response';
import { PrismaClient } from '@prisma/client';
import React from 'react';
import AlternateMeaningFAQContent from './AlternateMeaningFAQContent';


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

const FAQAlternateMeaning: React.FC<SongFAQItemProps> = async (props) => {
  const question = "Give an Alternate Interpretation of this Song"
  const faq_in_db = await GetFAQ(props.faq_slug)
  const split_meaning = faq_in_db?.answer.split("\n\n")
  
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
                      {faq_in_db != null ? (
                        <div className='p-8'>
                          {split_meaning?.map((paragraph, index) => (
                            <p key={index} className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-800">{paragraph}</p>
                          ))}
                        </div>
                        ):(
                        <div className='p-8'>
                          <AlternateMeaningFAQContent prompt={props.prompt} faq_slug={props.faq_slug} song_data={props.song_data}  />
                        </div>
                      )}
                        
                        
                    </AccordionContent>
                    
                </div>
            </AccordionItem>
        </Accordion>
    </div>
  );
};

export default FAQAlternateMeaning;
