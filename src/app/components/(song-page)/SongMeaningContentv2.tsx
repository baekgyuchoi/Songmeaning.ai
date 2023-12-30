
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
    let emotional_journey_content = meaning.emotional_journey
    let background_content = meaning.background

    if (typeof(emotional_journey_content) == "string"){
        emotional_journey_content = [emotional_journey_content]
    }

    if (typeof(background_content) == "string"){
        background_content = [background_content]
    }
    

    


    return (
        
        <div>
            {/* <>
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
                                    <p className='mt-8 ml-2 italic ' key={i}>{"\""+item.quote + "\""}</p>
                                    <p className='mt-2' key={i}>{item.explanation}</p>
                                </>
                            )
                        })}
                    </div>
                    
                </div>
                
                
            </> */}
            <>
    <div className='text-gray-800'>
        <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
            {meaning.summary}
        </p>
    </div>
    <div className='text-gray-800 mt-10'>
        <div className='w-full flex justify-start border-b border-gray-300 py-2'>
            <h1 className='text-xl font-semibold ml-2'>Song Meaning</h1>
        </div>
        {emotional_journey_content.map((item, i) => (
            item.trim() && (
                <p key={i} className='mx-2 mt-4 text-base sm:text-lg leading-relaxed'>
                    {item}
                </p>
            )
        ))}
    </div>
    <div className='text-gray-800 mt-10'>
        <div className='w-full flex justify-start border-b border-gray-300 py-2'>
            {(meaning.quotes == null) ? (<></>):(<h1 className='text-xl font-semibold ml-2'>Quotes</h1>)}
        </div>
        <div className="mx-2 mt-4">
            {meaning.quotes.map((item, i) => (
                <div key={i} className='mt-6'>
                    <p className='italic text-lg'>{`"${item.quote}"`}</p>
                    <p className='mt-2 text-base sm:text-lg leading-relaxed'>{item.explanation}</p>
                </div>
            ))}
        </div>
    </div>
</>

            
            
        </div>
     
    
    );
};

export default SongMeaningContent;

