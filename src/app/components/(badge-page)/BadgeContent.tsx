
import { CardContent } from '@/components/ui/card';
import React, { Suspense } from 'react';
import BadgeTopSongs from './BadgeTopSongs';
import BadgeStatistics from './BadgeStatistics';

interface BadgeContentProps {
    badge_name: string
}

const BadgeContent: React.FC<BadgeContentProps> = async (props) => {
  return (
    <div className=''>
    <CardContent className='flex flex-col p-4 pt-8 items-center max-w-full overflow-hidden'>
        
        <div className="w-full md:w-4/5 ">
            
            <div className='text-black flex flex-col md:flex-row  items-center rounded-md w-full pl- pr-2  '>
                <div className="flex font-mono items-center justify-center w-full md:w-1/2  text-4xl">
                    <p> Top Songs </p>
                   
                </div>
                
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="flex-shrink w-full md:w-2/3">
                        <BadgeTopSongs badge_name={props.badge_name} />
                    </div>
                </Suspense>
              
            </div>
        
        </div>
        <div className='w-full font-mono flex md:justify-center '>
            <div className="w-full md:w-2/3 flex-shrink pl-2">
                <div className="flex items-center justify-center w-full text-black h-full ">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BadgeStatistics badge_name={props.badge_name} />
                    </Suspense>
                </div>
            </div>
        </div>
    </CardContent>
    </div>
  );
};

export default BadgeContent;
