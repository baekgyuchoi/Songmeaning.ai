
'use client'
import React from 'react';

import PaymentLink from './PaymentLink';

 


interface LinksContainerProps {
    // Define your component props here
    song_slug: string;
}

const LinksContainer: React.FC<LinksContainerProps> = (props) => {
    
    return (
        <div className='flex items-center justify-center w-full mt-3 '>
      
          
          
   
            <div className='mb-2'>
                <PaymentLink />
            </div>
        
        </div>
    );
};

export default LinksContainer;
