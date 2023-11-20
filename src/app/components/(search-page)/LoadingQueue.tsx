'use client'
import { SongInfo } from "@/lib/validators/song_info"
import TypewriterComponent from "typewriter-effect"


interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}



const LoadingQueue: React.FC<Props> = (props) => {
    const song_title = props.songInfo.song_title

    return(
        <div className="">

        <div className="flex flex-col items-center justify-center">


            <p className="text-2xl font-bold text-indigo-600 animate-pulse">
            Loading...
            </p>

            <div className="text-black mt-10">
                <TypewriterComponent
                options={{
                    strings: [`You are first to explore this song!`, `Analyzing ${song_title} lyrics...`, `Reading ${props.songInfo.artist_name}'s mind` ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 25,
                }} />
            </div>

        </div>
        
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