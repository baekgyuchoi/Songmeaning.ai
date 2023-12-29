
import React from 'react';

type formatted_meaning = {
    "summary_analysis": string,
    "background": string,
    "emotional_journey": string,
    "quotes": string,
    "conclusion": string,
  }

interface FormattedMeaningContentProps {
    formatted_meaning: formatted_meaning
    song_title: string
    artist_name: string
}

const FormattedMeaningContent: React.FC<FormattedMeaningContentProps> = (props) => {
    return(
        <>
        </>
    )
}

// const FormattedMeaningContent: React.FC<FormattedMeaningContentProps> = (props) => {
//   // Add your component logic here
//     const formatted_meaning = props.formatted_meaning


//     let summary_analysis = formatted_meaning.summary_analysis
    
//     if (formatted_meaning.summary_analysis == "" || formatted_meaning.quotes == null || formatted_meaning.emotional_journey == "" || formatted_meaning.quotes == "" ) {

//         return(
//             <>
//                 <p
//                     className="text-gray-800 ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300" 
//                 >
//                     {formatted_meaning.conclusion}
//                 </p>
//             </>
//         )
//     }

//     if (props.artist_name.includes('.')) {
//         summary_analysis = summary_analysis.split(props.artist_name).join('{$artist_name}')

//     }
//     if (props.song_title.includes('.')) {
//         summary_analysis = summary_analysis.split(props.song_title).join('{$song_title}')
//     }

//     return (
//         // Add your JSX code here
//         <>
//             <div className='text-gray-800'>
//                 {/* <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Summary Analysis</h1></div> */}
//                 {/* <ul
                
//                     className="list-disc ml-8 mr-2 mt-3 text-base sm:text-lg transition duration-300 " 
//                 >
//                     {summary_analysis_arr!.map((item, i) => {
//                         if (item == "" || item == " ") {
//                             return 
//                         }
//                         return (
//                             <li key={i} className='mt-2'>

//                                {item.split('.').join('').split('{$artist_name}').join(props.artist_name).split('{$song_title}').join(props.song_title)}

//                             </li>
//                         )
//                     })}

//                 </ul> */}
//                 <p
                
//                     className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300" 
//                 >
//                     {formatted_meaning.summary_analysis}
//                 </p>
                
          
//             </div>
//             {(formatted_meaning.background == "" || formatted_meaning.background == null) ? (<> </>):(
//                 <div className='text-gray-800 mt-8'>
//                     <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Background</h1></div>
                    
//                     <ul className='list-disc ml-8 mr-2 mt-3 text-base sm:text-lg transition duration-300 '>
//                         {formatted_meaning.background.split('- ').map((item, i) => {
//                             if (item == "" || item == " ") {
//                                 return 
//                             }
//                             return (
//                                 <li key={i} className='mt-2'>
//                                    {item}
//                                 </li>
//                             )
//                         })}
//                     </ul>
              
                    
//                 </div>
//             )}
            

//             <div className='text-gray-800 mt-8'>
//                 <div className='w-full flex justify-start border-b font-mono font-bold '><h1 className='ml-2'>Emotional Journey</h1></div>
//                     {formatted_meaning.emotional_journey.split('\n').map((item, i) => {
//                         if (item == "" || item == " ") {
//                             return 
//                         }
//                         return (
//                             <p key={i} className='ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300'>
//                                {item}
//                             </p>
//                         )
//                     })}
                    
                
//             </div>
//             <div className='text-gray-800 mt-8'>
//                 <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Quotes</h1></div>
//                 <div
                
//                     className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300 " 
//                 >
//                     {formatted_meaning.quotes.split('\n').map((item, i) => {
                      
                        
//                         // if (i%2 == 0 )  {
//                         //     const printed_item = item.slice(2, item.length)
//                         //     return (
//                         //         <div className='w-full mt-5 flex items-center justify-center'>
//                         //             <p className='italic text-center'>{printed_item}</p>
                                
//                         //         </div>
                                
//                         //     )
//                         // }
//                         return (
                            
//                             <p className='mt-2' key={i}>{item}</p>
//                         )
//                     })}
//                 </div>
                
//             </div>
//             {formatted_meaning.conclusion == "" || formatted_meaning.conclusion == null ? (<> </>):(
//                 <div className='text-gray-800 mt-8'>
//                     <div className='w-full flex justify-start border-b font-mono font-bold'><h1 className='ml-2'>Conclusion</h1></div>
//                     <p
                    
//                         className="ml-2 mr-2 mt-3 text-base sm:text-lg transition duration-300" 
//                     >
//                         {formatted_meaning.conclusion}
//                     </p>
                    
//                 </div>
//             )}
            
//         </>
//     );
// };

export default FormattedMeaningContent;
