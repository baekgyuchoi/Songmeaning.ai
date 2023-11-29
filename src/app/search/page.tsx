import { SongInfo } from "@/lib/validators/song_info";

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
            song_short_title: hit.result.title,
            genius_url: hit.result.url,
            song_slug: hit.result.path.split('/').pop()?.split('-lyrics')[0].split('-annotated')[0],
            genius_id: parseInt(hit.result.id),
            artist_name: hit.result.primary_artist.name,
            artist_slug: hit.result.primary_artist.url.split('/').pop(),
            header_image_url: hit.result.header_image_url,
            song_art_url: hit.result.song_art_image_url,
            release_date: hit.result.release_date_for_display,
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
   
    return (
        <main className="flex flex-col items-center p-4 ">
          
          <div className="container max-w-4xl ">
      
            <h1 className="text-2xl text-gray-800 mb-5 font-mono">
              Search results for: {searchQuery}
            </h1>
            <div className="mt-4 grid grid-cols-1 gap-x-8 md:mt-6 md:grid-cols-1 md:gap-y-2 block">
              <ul className="">
                {data.map((result, index) => (
                  <li 
                    key={index}
                    className="py-2 w-full flex flex-col flex-row "
                  >
                    <div className="flex bg-transparent text-gray  tracking-tight text-l md:text-3xl sm:text-3xl hover:outline-blue focus:outline-none focus:shadow-outline">
                      <SearchItemButton songInfo={result} />
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
            
            
          </div>
          
          <footer className="text-gray-500 text-sm mt-32">
            Copyright {new Date().getFullYear()}
          </footer>
      
        </main>
      );

  }




