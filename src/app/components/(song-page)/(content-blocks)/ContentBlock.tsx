
import { SongInfo } from "@/lib/validators/song_info"

import { Suspense } from "react"
import StructuredContentBlock from "./StructuredContentBlock"

import { SongData } from "@/lib/validators/song_data_response"
import { Loader2 } from "lucide-react"


interface Props{
    song_info: SongInfo
    song_data: SongData
}

const ContentBlock: React.FC<Props> =  async (props) => {
   return(
       <div className="">
        
           <Suspense fallback={
                <div className="h-96 flex flex-col items-center justify-center">

                <Loader2 className="animate-spin animate-pulse text-purple-800" size={45} />

                <div className="text-black mt-10">
                    Loading Song Meaning... Please wait a moment
                </div>
       
               </div>
           }>
                <StructuredContentBlock song_info={props.song_info}/>
           </Suspense>
           <div className="my-20"></div>
           {/* <Suspense fallback={<p className="h-48">loading....</p>}>
                <SongFAQ songData={props.song_data} />
            </Suspense> */}
       </div>
   )
}
export default ContentBlock