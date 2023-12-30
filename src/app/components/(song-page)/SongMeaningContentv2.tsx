
import { SongMeaning } from '@/lib/validators/song_meaning';


type song_meaning = {
    summary: string,
    emotional_journey: String[],
    background: String[],
    quotes: any[],
  }




interface SongMeaningContentProps {
    // Define your component props here
    song_meaning: song_meaning
  }



const SongMeaningContent: React.FC<SongMeaningContentProps> = async (props) => {
    const meaning = props.song_meaning

    
    

    


    return (
        
        <div>
                <>
                <div className='text-gray-800 '>
                    <p className='ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300'>
                        {meaning.summary}
                    </p>
                    
                </div>
                <div className='text-gray-800 mt-8'>
                    <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Song Meaning</h1></div>
                        {meaning.emotional_journey.map((item, i) => {
                            if (item == "" || item == " ") {
                                return 
                            }
                            return (
                                <p key={i} className='ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300'>
                                {item}
                                </p>
                            )
                        })}
                        
                    
                </div>
                <div className='text-gray-800 mt-8'>
                    <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Quotes</h1></div>
                    <div
                    
                        className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300 " 
                    >
                        {meaning.quotes.map((item, i) => {
                        
                            
                            // if (i%2 == 0 )  {
                            //     const printed_item = item.slice(2, item.length)
                            //     return (
                            //         <div className='w-full mt-5 flex items-center justify-center'>
                            //             <p className='italic text-center'>{printed_item}</p>
                                    
                            //         </div>
                                    
                            //     )
                            // }
                            return (
                                <>
                                    <p className='mt-8 ml-2 italic ' key={i}>"{item.quote}"</p>
                                    <p className='mt-2' key={i}>{item.explanation}</p>
                                </>
                            )
                        })}
                    </div>
                    
                </div>
                
                
            </>

            
            
        </div>
     
    
    );
};

export default SongMeaningContent;

