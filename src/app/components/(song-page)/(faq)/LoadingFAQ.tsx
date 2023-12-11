import { Loader2 } from "lucide-react"




const LoadingFAQ: React.FC = () => {
    

    return(
        <div className="">

        <div className="container flex flex-col items-center justify-center pb-8">


            <Loader2 className="text-black animate-spin mb-8" size={64} />

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


export default LoadingFAQ