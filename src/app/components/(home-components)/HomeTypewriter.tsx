
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
        <div className="font-mono">
          
          <TypewriterComponent 
            options={{
              strings: ['Hello', 'Welcome to Songmeanings.ai', 'Search a song to get started'],
              autoStart: true,
              loop: true,
            }}
            
          />
        </div>
    );
};

export default HomeTypewriter;
