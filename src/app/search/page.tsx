import { SongInfo } from "@/lib/validators/song_info";
import { Suspense } from "react";
import SearchItemButton from "../components/(search-page)/SearchItemButton";


const geniusAPISearchURL = 'https://api.genius.com/search?q='
const genius_access_token = "oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ"


async function getSearchResults(searchQuery: string | undefined) {
    const response = await fetch(geniusAPISearchURL + searchQuery, {
        headers: {
            'Authorization': 'Bearer ' + genius_access_token
        }
    });
    if (!response.ok) {
        throw new Error('failed to fetch data');
    }
    const data = await response.json();
    const songInfoArray: SongInfo[] = [];
    
    // Loop through each object in the hits array
    for (const hit of data.response.hits) {
        const songInfo: SongInfo = {
            song_title: hit.result.full_title,
            genius_url: hit.result.url,
            song_slug: hit.result.path.split('/').pop()?.split('-lyrics')[0].split('-annotated')[0],
            genius_id: hit.result.id,
            artist_name: hit.result.primary_artist.name,
            artist_slug: hit.result.primary_artist.url.split('/').pop(),
            has_meaning: true
        };
        songInfoArray.push(songInfo);
    }

    return songInfoArray;
}


export default async function SearchPage({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | undefined};
  }) {
    const searchQuery = searchParams?.q;
 
    const data = await getSearchResults(searchQuery);
    console.log(data)



    return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>{searchQuery}</h1>
        {/* <p>{data} </p> */}
        <Suspense>
                <ul>
                {data.map((result, index) => (
                    
                    <li 
                        key={index}
                        className='py-1'
                    >
                        <SearchItemButton songInfo={result} />
                    </li>
                   
                    ))}
                    
                </ul>

        </Suspense>
        <div> copyright </div>
    </div>
    )
  }




