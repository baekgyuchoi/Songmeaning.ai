
import React from 'react';
import { Loader2 } from 'lucide-react';
import NavBar from '@/app/components/NavBar';


const LoadingPage = () => {
    return (
        <main className='bg-purple-50'>
        
            <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-inherit ">
                <Loader2 className='animate-spin h-12 w-12 text-purple-800'  />
            </div>
        </main>
    );
};

export default LoadingPage;
