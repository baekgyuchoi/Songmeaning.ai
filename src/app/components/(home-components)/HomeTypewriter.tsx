
'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';

interface Props {
    // Define the props for your component here
}



const HomeTypewriter: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    // Define your component logic here

    return (
        // Return your JSX here
        <div className="font-mono text-gray-600 w-full text-center">
          
          <TypewriterComponent 
            options={{
              strings: ['Enrich your life with radically deeper song meanings', 'Search a song to get started'],
              autoStart: true,
              loop: true,
              deleteSpeed: 25,
              delay : 50,
            }}
            
          />
        </div>
    );
};

export default HomeTypewriter;
