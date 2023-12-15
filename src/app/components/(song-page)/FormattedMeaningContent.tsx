
import React from 'react';

type formatted_meaning = {
    "summary_analysis": string,
    "emotional_journey": string,
    "quotes": string,
    "conclusion": string,
  }

interface FormattedMeaningContentProps {
    formatted_meaning: formatted_meaning
}

const FormattedMeaningContent: React.FC<FormattedMeaningContentProps> = (props) => {
  // Add your component logic here
    const formatted_meaning = props.formatted_meaning
    const summary_analysis = formatted_meaning.summary_analysis.split('ft.').join('ft')
 
    if (formatted_meaning.summary_analysis == "" || formatted_meaning.quotes == null || formatted_meaning.emotional_journey == "" || formatted_meaning.quotes == "" || formatted_meaning.conclusion == "") {
        return(
            <>
                <p
                    className="text-gray-800 ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300" 
                >
                    {formatted_meaning.conclusion}
                </p>
            </>
        )
    }
    return (
        // Add your JSX code here
        <>
            <div className='text-gray-800'>
                <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Summary Analysis</h1></div>
                <ul
                
                    className="list-disc ml-8 mr-2 mt-3 text-base sm:text-lg transition duration-300 " 
                >
                    {summary_analysis.split('. ').map((item, i) => {
                        return (
                            <li key={i} className='mt-2'>
                                {item.split('.')[0].split('ft').join('ft.')}
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            <div className='text-gray-800 mt-8'>
                <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Emotional Journey</h1></div>
                <p
                
                    className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300 " 
                >
                    {formatted_meaning.emotional_journey}
                </p>
                
            </div>
            <div className='text-gray-800 mt-8'>
                <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Quotes</h1></div>
                <div
                
                    className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300 " 
                >
                    {formatted_meaning.quotes.split('\n').map((item, i) => {
                      
                        
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
            <div className='text-gray-800 mt-8'>
                <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Conclusion</h1></div>
                <p
                
                    className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300" 
                >
                    {formatted_meaning.conclusion}
                </p>
                
            </div>
        </>
    );
};

export default FormattedMeaningContent;
