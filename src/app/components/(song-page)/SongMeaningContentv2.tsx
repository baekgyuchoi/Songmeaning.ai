
import { SongMeaning } from '@/lib/validators/song_meaning';


type song_meaning = {
    summary_analysis: string,
    meaning: string,
    background: string,
    quotes: string,
  }




interface SongMeaningContentProps {
    // Define your component props here
    song_meaning: SongMeaning
  }



const SongMeaningContent: React.FC<SongMeaningContentProps> = async (props) => {
    let song_meaning_content = {} as song_meaning
    const meaning = props.song_meaning

    console.log(meaning)

    const json_v1meaning = JSON.parse(meaning.meaning!)


    if (meaning?.meaning != null){
        song_meaning_content.summary_analysis = json_v1meaning.summary_analysis
        song_meaning_content.meaning = json_v1meaning.meaning
        if (song_meaning_content.meaning == null || song_meaning_content.meaning == "") {
            song_meaning_content.meaning = json_v1meaning.emotional_journey
        }
        if (song_meaning_content.quotes == null || song_meaning_content.quotes == "") {
            song_meaning_content.quotes = json_v1meaning.quotes
        }
    }
    

    


    return (
        
        <div>
          
                <>
               
               
                
                <div className='text-gray-800 '>
                    <p className='ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300'>
                        {song_meaning_content.summary_analysis}
                    </p>
                    
                </div>
                <div className='text-gray-800 mt-8'>
                    <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Song Meaning</h1></div>
                        {song_meaning_content.meaning.split('\n').map((item, i) => {
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
                        {song_meaning_content.quotes.split('\n').map((item, i) => {
                        
                            
                            // if (i%2 == 0 )  {
                            //     const printed_item = item.slice(2, item.length)
                            //     return (
                            //         <div className='w-full mt-5 flex items-center justify-center'>
                            //             <p className='italic text-center'>{printed_item}</p>
                                    
                            //         </div>
                                    
                            //     )
                            // }
                            return (
                                
                                <p className='mt-2' key={i}>{item}</p>
                            )
                        })}
                    </div>
                    
                </div>
                
                
            </>

            
            
        </div>
     
    
    );
};

export default SongMeaningContent;

