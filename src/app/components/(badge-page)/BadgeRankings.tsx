
import { CardContent } from '@/components/ui/card';
import React, { Suspense } from 'react';




const BadgeContent: React.FC = async () => {
  return (
    <div className=''>
    <CardContent className='flex flex-col md:flex-row p-4 pt-8 items-center max-w-full overflow-hidden'>
        <Suspense fallback={<div>Loading...</div>}>
            
        </Suspense>
    </CardContent>
    </div>
  );
};

export default BadgeContent;
