import { SongInfo } from "@/lib/validators/song_info";

export const runtime = 'edge';

async function getSearchResults(searchQuery: string | undefined) {
    const geniusAPISearchURL = 'https://api.genius.com/search?q='
      const response = await fetch(geniusAPISearchURL + searchQuery, {
          headers: {
              'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY_1,
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
              artist_id: parseInt(hit.result.primary_artist.id),
              artist_slug: hit.result.primary_artist.url.split('/').pop(),
              header_image_url: hit.result.header_image_url,
              song_art_url: hit.result.song_art_image_url,
              release_date: hit.result.release_date_for_display || "",
          };
          songInfoArray.push(songInfo);
      }
  
      return songInfoArray;
  }


export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    
    
    const req_slug = (queryParam.get('q') || "0")
        
        
    try{
        const songs = await getSearchResults(req_slug)

        return new Response(JSON.stringify({songInfoArray: songs}))
    }
    catch{

        return new Response("Error")
    }
    // const url = new URL(request.url)
    // const queryParam = url.searchParams
    // const song_id = queryParam.get('q')
    // query if song_id exists in database or use song_slug instead
    
    // return new Response()
}


