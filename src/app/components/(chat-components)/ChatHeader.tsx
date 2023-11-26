import { SongInfo } from '@/lib/validators/song_info'
import { FC } from 'react'

interface ChatHeaderProps {
    song_info: SongInfo
}

const ChatHeader: FC<ChatHeaderProps> = (props) => {
    const artist_name = props.song_info.artist_name
    return (
    <div className='w-full flex gap-3 justify-start items-center text-zinc-800'>
        <div className='flex flex-col items-start text-sm'>
            <p className='text-xs'>Chat with</p>
            <div className='flex gap-1.5 items-center'>
                <p className='w-2 h-2 rounded-full bg-green-500'></p>
                <p className='font-medium'> {artist_name} AI </p>
            </div>
        </div>
    </div>
    )
}

export default ChatHeader