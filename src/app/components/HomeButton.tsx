


import Link from 'next/link';
import React from 'react';

interface Props {
    // Define the props for your component here
}



const HomeButton: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    // Define your component logic here
    
    return (
        // Return your JSX here
        <Link 
        href="/"
        className="">
        <div className='flex items-center justify-center hover:bg-gray-200 '>
            <div className=" flex items-center justify-center rounded p-2 transition text-gray-600  " >
                <div className='w-1/6 mr-2 flex items-center'>
                    <img src='/Songmeaning_favicon.png' />
                </div>
            
    
                <div
                    className="flex items-center justify-center  text-purple-900 font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline"
                >
                
                    <h1 className="font-mono text-2xl md:text-3xl font-medium">Songmeaning.<span className="text-gray-600 hover:text-gray-300 font-sans">AI</span></h1>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default HomeButton;
