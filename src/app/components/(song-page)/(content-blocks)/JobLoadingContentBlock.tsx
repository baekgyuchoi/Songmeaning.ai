'use client'

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
    song_slug: string;
}

const JobLoadingContentBlock: React.FC<Props>= (props) => {
    const router = useRouter();
    const [retryDelay, setRetryDelay] = useState(0); // Initial delay of 5 seconds
    const maxDelay = 40000;
    const checkJobStatus = async () => {
        try {
            const response = await fetch(`/api/job_status?q=${props.song_slug}`);
            
            const data = await response.json();
            const isJobComplete = data.isJobDone;
            if (isJobComplete) {
                // Refresh the page
                router.refresh();
            } else {
                // If not complete, check again after a delay
                if (retryDelay > maxDelay) {
                    console.error('Job is taking too long to complete');
                    
                    const response = await fetch('/flag_job', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({song_slug: props.song_slug}),
                    });
                    const success = await response.json();
                    if (response.ok && success.success) {
                        console.log('Job flagged for review');
                    } else {
                        console.error('Failed to flag job for review');
                    }
                    router.refresh();
                }
                const newDelay = Math.min(maxDelay, retryDelay + 5000); // Double the delay, but do not exceed maxDelay
                setTimeout(checkJobStatus, newDelay);
                setRetryDelay(newDelay);
            }
        } catch (error) {
            console.error('Failed to check job status:', error);
        }
    };
    
    useEffect(() => {
        // Function to check the job status
        

        // Initiate the first check
        checkJobStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array means this effect runs once on mount


    return (
        <div className="h-96 flex flex-col items-center justify-center">

            <Loader2 className="animate-spin animate-pulse text-purple-800" size={45} />

        <div className="text-black mt-10">
            Loading Song Meaning... Please wait a moment
        </div>

        </div>
    );
};

export default JobLoadingContentBlock;
