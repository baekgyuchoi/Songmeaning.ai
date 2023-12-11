
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
    console.log(formatted_meaning)
    return (
        // Add your JSX code here
        <>
            <div className='text-gray-800'>
                <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Summary Analysis</h1></div>
                <p
                
                    className="ml-2 mr-2 mt-3 text-lg transition duration-300 hover:text-indigo-700 md:hover:text-indigo-500" 
                >
                    {formatted_meaning.summary_analysis}
                </p>
                
            </div>
            <div className='text-gray-800 mt-8'>
                <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Emotional Journey</h1></div>
                <p
                
                    className="ml-2 mr-2 mt-3 text-lg transition duration-300 hover:text-indigo-700 md:hover:text-indigo-500" 
                >
                    {formatted_meaning.emotional_journey}
                </p>
                
            </div>
            <div className='text-gray-800 mt-8'>
                <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Quotes</h1></div>
                <p
                
                    className="ml-2 mr-2 mt-3 text-lg transition duration-300 hover:text-indigo-700 md:hover:text-indigo-500" 
                >
                    {formatted_meaning.quotes}
                </p>
                
            </div>
            <div className='text-gray-800 mt-8'>
                <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Conclusion</h1></div>
                <p
                
                    className="ml-2 mr-2 mt-3 text-lg transition duration-300 hover:text-indigo-700 md:hover:text-indigo-500" 
                >
                    {formatted_meaning.conclusion}
                </p>
                
            </div>
        </>
    );
};

export default FormattedMeaningContent;
