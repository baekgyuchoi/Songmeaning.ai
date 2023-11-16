import { SongInfo } from "@/lib/validators/song_info"



interface Props {
    // Define the props for your component here
    songInfo: SongInfo
}



const LoadingQueue: React.FC<Props> = (props) => {
    const song_title = props.songInfo.song_title

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">

        <div className="flex flex-col items-center">


            <p className="text-2xl font-bold text-indigo-600 animate-pulse">
            Loading...
            </p>

            <p className="mt-4 text-lg text-gray-700">
            You are first to explore {song_title}!
            </p>

            <p className="mt-4 text-lg text-gray-700">
            Please wait while we comprehensively analyze the lyrics' meaning...
            </p>

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