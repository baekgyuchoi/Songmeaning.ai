'use client'
import { SongInfo } from "@/lib/validators/song_info"
import TypewriterComponent from "typewriter-effect"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}
async function GetV1Meaning(songInfo: SongInfo) {
    const response = await fetch('/api/queue_song_meaning_v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(songInfo),
    });
    const data = await response.json();
    return data
}
  
async function GetV2Meaning(songInfo: SongInfo) {
    const response = await fetch('/api/queue_song_meaning_v2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(songInfo),
    });
    const data = await response.json();
    return data
}



const LoadingQueue: React.FC<Props> = (props) => {
    const handleClick = () => {

        setDidLoadingFail(false)
        first_render = true
        router.refresh()
        fetchData(props.songInfo)

    }
    const router = useRouter()
    const [didLoadingFail, setDidLoadingFail] = useState(false)
    const song_title = props.songInfo.song_title
    let first_render = true
    const fetchData = async (songInfo: SongInfo) => {
        if (!first_render){
            return
        }
        try {
            const response = await GetV1Meaning(songInfo)
            console.log(response)
            if (!response.valid){
                setDidLoadingFail(true)
            }
            router.refresh()
        }
        catch (err) {
            console.log(err)
            router.refresh()
        }
    }
    useEffect(() => {
        fetchData(props.songInfo)
        first_render=false
    }, [])


    return(
        <div className="">

        <div className="flex flex-col items-center justify-center">


            <p className="text-2xl font-bold text-purple-800  animate-pulse">
            Loading...
            </p>

            <div className="text-black mt-10 text-center">
                <TypewriterComponent
                options={{
                    strings: [`You are first to explore this song!`, `We take pride in delivering you the highest quality song meaning in the world, which takes around 30 seconds.`,`Analyzing ${song_title} lyrics...`, ` Thanks for waiting 🙏🏻` ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 25,
                }} />
            </div>

        </div>
        {didLoadingFail ? (
                        <div className=' flex items-center justify-center mt-10'>
                            <div className='w-full lg:w-2/3 border-red-400/50 border-2 bg-white rounded-md flex flex-col justify-center items-center'>
                            <p className="text-center text-gray-800 mt-4 text-xs sm:text-base font-mono transition duration-300 ">
                                There was an error generating the response
                            </p>
                          
                            <button
                                onClick={handleClick}
                                className='underline font-bold text-black text-center text-xs sm:text-base font-mono mb-4'
                            >
                                Regenerate
                            </button>
                            </div>
                        </div>
                    ):(
                        <>
                        </>
                    )}
        
        </div>
        // <div className= "fixed inset-0 z-100 bg-white bg-opacity-100 flex items-center justify-center">
        //     <p className="animate-pulse text-gray-700 text-2xl">
        //         Loading...
        //     </p>
        //     <p className="text-lg text-gray-700 mb-4">
        //         You are first to explore {song_title}!
        //     </p>


        // </div>
    )
}


export default LoadingQueue