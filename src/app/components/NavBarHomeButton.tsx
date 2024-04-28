


import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
    // Define the props for your component here
}



const NavBarHomeButton: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    // Define your component logic here
    
    return (
        // Return your JSX here
       
        <div className='flex items-center justify-center w-full  '>
            <Link 
            href="/"
            className="">
            <div className=" flex items-center justify-center rounded p-2 transition text-gray-600  " >
                <div className='w-1/6 mr-2 flex items-center'>
                    <Image className="w-16" src='/Songmeaning_favicon.png' alt='songmeaning.ai logo' width={150} height={150} />
                </div>
            
    
                <div
                    className="flex items-center justify-center  text-purple-900 font-bold text-2xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline"
                >
                
                    <div className="font-mono text-base  sm:text-2xl font-medium">Songmeaning.AI</div>
                </div>
            </div>
            </Link> 
        </div>
        
    );
};

export default NavBarHomeButton;
