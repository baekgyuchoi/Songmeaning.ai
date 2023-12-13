
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SongData } from '@/lib/validators/song_data_response';
import React from 'react';
import AlternateMeaningFAQContainer from './AlternateMeaningFAQContainer';


interface SongFAQItemProps {
    prompt: string;
    faq_slug: string;
    song_data: SongData;
}



const FAQAlternateMeaning: React.FC<SongFAQItemProps> = async (props) => {
  const question = "Alternate Interpretation of Song"
  
  
  return (
    <div>
      {/* Your component code here */}
      <Accordion 
            type='single' 
            collapsible 
            className=' font-mono '>
            <AccordionItem value='item-1'>
                <div className='w-full  border rounded-md overflow:hidden  '>
                    <AccordionTrigger className='px-6 border-b border-zinc-300 font-bold font-mono truncate'>
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

export default FAQAlternateMeaning;
