'use client'
import { SongInfo } from "@/lib/validators/song_info"
import TypewriterComponent from "typewriter-effect"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@nextui-org/react"
import LoadingProgressBar from "./LoadingProgressBar"


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

            <LoadingProgressBar />
          

            {/* <div className="text-center mt-10 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
                <p className="text-sm md:text-base">
                    You're the first to explore this song's meaning, so we have not analyzed this song yet. In roughly 30 seconds, we will present you with by far the world's highest quality song meaning. Your patience unveils unparalleled depth. Thank you for being the first.
                </p>
            </div> */}
            <div className="text-center mt-10 px-4 py-8 bg-gradient-to-r from-blue-200 to-purple-200 text-black rounded-lg shadow-lg transform transition-all ">
                <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
                <p className="text-base leading-relaxed mb-1">
                    {"You are the first to explore this song\'s meaning, so we have not analyzed this song yet."}
                </p>
                <p className="text-base leading-relaxed mb-1">
                    {"In roughly 30 seconds, we will present you with by far the world\'s highest quality song meaning."}
                </p>
                <p className="text-base leading-relaxed">
                    {"Your patience unveils unparalleled depth. Thank you for being the first."}
                </p>
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