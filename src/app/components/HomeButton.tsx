'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
    // Define the props for your component here
}



const HomeButton: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    // Define your component logic here
    const router = useRouter();
    const buttonClick = () => {
        router.push("/");
    };

    return (
        // Return your JSX here
        <div className=" rounded p-2 transition hover:bg-gray-200" >
            <button
                onClick={buttonClick}
                className="bg-transparent text-gray font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline">
              
               <h1 className="font-mono text-3xl font-medium">Songmeanings.<span className="font-sans">AI</span></h1>
            </button>
        </div>
    );
};

export default HomeButton;
