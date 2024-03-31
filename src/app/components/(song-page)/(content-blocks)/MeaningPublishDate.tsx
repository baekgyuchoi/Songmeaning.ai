
import { SongInfo } from "@/lib/validators/song_info"
import prisma from "@/lib/db"
import { Calendar } from "lucide-react"


interface Props{
    song_info: SongInfo
}

const MeaningPublishDate: React.FC<Props> =  async (props) => {

    const song_db = await prisma.songs.findUnique({
        where: {
            song_slug: props.song_info.song_slug,
        },
        include: {
            song_meaning_structured: {
                
            }
        }

    })

    const published_date = song_db?.song_meaning_structured?.createdAt.toLocaleDateString()

   

    



   return(
       <div className="flex flex-row text-black items-center justify-start pl-4">
         <Calendar size={20} />
         <p className="ml-1 font-semibold">
            {published_date}
         </p>
       </div>
   )
}
export default MeaningPublishDate