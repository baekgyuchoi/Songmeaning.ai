import { SongData } from '@/lib/validators/song_data_response';
import React from 'react';

interface InstagramSquareProps {
    song_data: SongData
}

const InstagramSquare: React.FC<InstagramSquareProps> = (props) => {
    const song_data = props.song_data
    return (
        <div className='relative border-1 border-b-4 border-purple-800/25 bg-gray-50 rounded-lg flex flex-col items-center sm:flex-row aspect-square w-96'>
        
            <div className='absolute inset-0 bg-cover bg-center rounded-lg rounded-t-2xl' style={{ backgroundImage: `url(${song_data.song_image_url})`, opacity: 0.25 }}>

            </div>
    
            <div className='w-56  h-56 rounded-lg bg-purple-500/25 relative z-10'>
            <img 
                src={song_data.header_image_url}
                alt='song art'
                className="object-cover w-56 h-56 p-2  "
            >
            </img>
            </div>
        
            <div className="relative z-10 w-full mt-8 p-3 text-center sm:text-left sm:ml-3 sm:mt-12 mb-6 text-4xl  text-gray-800">
            
            
                <div className='flex flex-col items-center sm:items-start justify-start h-fill '>
                <p className='font-bold'>{song_data.song_short_title}</p> 
                <div className="flex justify-center sm: items-start text-xl sm:ml-1 text-gray-600 hover:text-gray-500 mt-2 mb-4"> 
                    <p
                
                        className='w-full overflow-hidden underline text-gray-500' 
                    
                    >   
                    
                        {song_data.artist_name}
                    
                    </p>
                </div>
                </div>
                <div className='flex flex-col sm:flex-row justify-center sm:justify-between'>
                <div className='text-base sm:ml-1 flex flex-col font-mono items-start'>
                    {song_data.release_date == "" || song_data.release_date == null ? (
                    <p>Released: N/A </p>
                    ) : (
                    <p>Released:  {song_data.release_date}</p>
                    )}
                    
                    
                    
                    
                </div>
                <div className='mt-4 underline'>
                    
                </div>
                </div>
                
            
            </div>
        </div>
    );
};

export default InstagramSquare;
