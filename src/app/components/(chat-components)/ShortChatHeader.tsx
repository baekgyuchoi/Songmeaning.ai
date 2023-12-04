import { SongInfo } from '@/lib/validators/song_info'
import { FC } from 'react'

interface ChatHeaderProps {
    song_info: SongInfo
}

const ChatHeader: FC<ChatHeaderProps> = (props) => {
    const artist_name = props.song_info.artist_name
    let artist_name_truncated = artist_name
    if (artist_name.length > 20) {
        artist_name_truncated = artist_name.slice(0, 20) + '...'
    }
    return (
    <div className='w-full flex gap-3 justify-start items-center justify-center text-zinc-800'>
        <div className='flex  items-center  text-sm'>
           
            <div className='flex gap-1.5 items-center'>
              
                <p className='font-medium '>Chat with {artist_name_truncated} AI </p>
            </div>
        </div>
    </div>
    )
}

export default ChatHeader