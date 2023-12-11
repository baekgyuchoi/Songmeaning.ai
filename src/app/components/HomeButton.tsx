

import Link from 'next/link';
import React from 'react';

interface Props {
    // Define the props for your component here
}



const HomeButton: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    // Define your component logic here
    
    return (
        // Return your JSX here
        <div className=" rounded p-2 transition " >
            <Link 
                href="/"
                className="bg-transparent hover:bg-gray-200 text-gray font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline">
              
               <h1 className="font-mono text-2xl md:text-3xl font-medium">Songmeaning.<span className="font-sans">AI</span></h1>
            </Link>
        </div>
    );
};

export default HomeButton;
