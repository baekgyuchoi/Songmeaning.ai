'use client'

import { Button } from "@nextui-org/react"
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { set } from "zod";

interface Props {
    song_slug: string;
}

const GenerateNewContent: React.FC<Props> = (props) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const router = useRouter();
   
    return (
        <div>
            {isGenerating? (
                <>
                    <div className="h-96 flex flex-col items-center justify-center">

                    <Loader2 className="animate-spin animate-pulse text-purple-800" size={45} />

                    <div className="text-black mt-10">
                        Loading Song Meaning... Please wait 30 seconds
                    </div>

                    </div>
                </>
            ) : (
                <>
                <div className="flex flex-col items-center justify-center w-full h-48">
                    <div className="w-2/3 ">
                        <p className="text-2xl font-bold text-center mb-12">You are first to visit this page!</p>
                        <button
                        className=" w-full bg-purple-800/50 border-gray-600 border-2 hover:bg-purple-800/25 text-white font-bold py-2 px-8 flex flex-col items-center justify-center rounded-lg"
                        onClick={async () => {
                            setIsGenerating(true);
                            console.log('enabling generation')
                            const response = await fetch('/api/enable_generation', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({song_slug: props.song_slug}),
                            });
                            const success = await response.json();
                            if (response.ok && success.success) {
                                console.log('generation enabled');
                            } else {
                                console.error('Failed to enable generation');
                            }
                            router.push(`/songs/${props.song_slug}`);
                            router.refresh();
                        }}
                        >
                        Generate New Content
                        </button>
                    </div>
                </div>
                </>
            )
            }
            
        </div>
    )
}

export default GenerateNewContent