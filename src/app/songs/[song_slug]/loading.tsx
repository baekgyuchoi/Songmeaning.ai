
import React from 'react';
import { Loader2 } from 'lucide-react';


const LoadingPage = () => {
    return (
        <main className=''>
            <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center ">
                <Loader2 className='animate-spin h-12 w-12'  />
            </div>
        </main>
    );
};

export default LoadingPage;
