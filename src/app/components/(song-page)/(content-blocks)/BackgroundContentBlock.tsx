
import { SongInfo } from "@/lib/validators/song_info"
import prisma from "@/lib/db"


interface Props{
    song_info: SongInfo
}

const BackgroundContentBlock: React.FC<Props> =  async (props) => {

    let isBackgroundValid = false
    const song_db = await prisma.songs.findUnique({
        where: {
            song_slug: props.song_info.song_slug,
        },
        include: {
            song_meaning_structured: {
                include: {
                    background: true,
                    meaning: true,
                    quotes: true
                }
            }
        }

    })

    const background_content = song_db?.song_meaning_structured?.background

    if (background_content != null && background_content != undefined){
        isBackgroundValid = true
    }

    if (!isBackgroundValid){
        return null
    }



   return(
       <div className="">
        <h2 className='mb-2 text-left'>Background:</h2>
            <ul className='list-disc ml-8 text-left'>
                <li className="mb-2">{background_content?.firstPoint}</li>
                <li>{background_content?.secondPoint}</li>
                
            </ul>
           
       </div>
   )
}
export default BackgroundContentBlock