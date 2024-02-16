type song_preview = {
    summary: string,
    emotional_journey: string,
    quotes: string,
  }

interface SongMeaningContentProps {
    // Define your component props here
    song_preview: song_preview
}

const SongMeaningContentv2: React.FC<SongMeaningContentProps> = async (props) => {
    const meaning = props.song_preview

   

    return (
        
        <div>
          
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
                    <p className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                        {meaning.emotional_journey}
                    </p>
                </div>
                <div className='text-gray-800 mt-10'>
                    <div className='w-full flex justify-start border-b border-gray-300 py-2'>
                        {(meaning.quotes == null) ? (<></>):(<h1 className='text-xl font-semibold ml-2'>Quotes</h1>)}
                    </div>
                    <div className="mx-2 mt-4">
                        {meaning.quotes.split("\n").map((item,index)=>{
                            return(
                                <p key={index} className='mx-2 mt-3 text-base sm:text-lg leading-relaxed'>
                                    {item}
                                </p>
                            )
                        })}
                        
                    </div>
                </div>


            </>
            
        </div>
     
    
    );
};

export default SongMeaningContentv2;

