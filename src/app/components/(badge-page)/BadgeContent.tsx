
import { CardContent } from '@/components/ui/card';
import React, { Suspense } from 'react';
import BadgeTopSongs from './BadgeTopSongs';
import BadgeStatistics from './BadgeStatistics';

interface BadgeContentProps {
    badge_name: string
}

const BadgeContent: React.FC<BadgeContentProps> = async (props) => {
  return (
    
    <CardContent className='flex flex-col p-4 pt-8 items-center max-w-full overflow-hidden'>
        
        <div className='w-full font-mono flex md:justify-center mt-20 mb-6'>
            <div className="w-full flex-shrink pl-2">
                <div className="flex items-center justify-center w-full text-black h-full ">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BadgeStatistics badge_name={props.badge_name} />
                    </Suspense>
                </div>
            </div>
        </div>
        
        <BadgeTopSongs badge_name={props.badge_name} />
         
      
    </CardContent>
    
  );
};

export default BadgeContent;
