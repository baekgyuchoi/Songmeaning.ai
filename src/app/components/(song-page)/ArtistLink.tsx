import { Link } from 'lucide-react';
import React from 'react';



interface ArtistLinkProps {
    // Define your component props here
    artist_slug: string;
    artist_id: number;
    artist_name: string
}


const ArtistLink: React.FC<ArtistLinkProps> = (props) => {



   
    return (
        <div className='flex items-start justify-start'>
            <Link
                href={`/artists/${props.artist_slug}/?artist=${props.artist_id}`}
                className='w-full overflow-hidden text-gray-600' 
               
            >   
             
                {props.artist_name}
            
            </Link>
      
        </div>
    );
};

export default ArtistLink;
