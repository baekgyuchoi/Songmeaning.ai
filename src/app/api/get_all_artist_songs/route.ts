import { SongInfo } from "@/lib/validators/song_info";

async function getArtistSongs(artist_id: number, artist_name: string, current_page: number) {

    
    let songInfoArray: SongInfo[] = []
    console.log("hey")
    const geniusAPIArtistURL = 'https://api.genius.com/artists/'+ artist_id +"/songs"+"?" + "sort=title&per_page=" + "12" + "&page=" + current_page
    const response = await fetch(geniusAPIArtistURL, {
        headers: {
            'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY_1
        },
        
    });
    if (!response.ok) {
        throw new Error('failed to fetch data');
    }
    const data = await response.json();
    
    console.log(data.response)
    for (let song of data.response.songs) {
    
        const songInfo: SongInfo = {
        song_title: song.full_title,
        song_short_title: song.title,
        genius_url: song.url,
        song_slug: song.path.split('/').pop()?.split('-lyrics')[0].split('-annotated')[0],
        genius_id: parseInt(song.id),
        artist_name: song.primary_artist.name,
        artist_id: parseInt(song.primary_artist.id),
        artist_slug: song.primary_artist.url.split('/').pop(),
        header_image_url: song.header_image_url,
        song_art_url: song.song_art_image_url,
        release_date: song.release_date_for_display,
        };
        songInfoArray.push(songInfo)
    
    
    }
    
    
    console.log(songInfoArray)
      
  
  
  
      
      return songInfoArray;
  }




export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    const artist_id = queryParam.get('artist_id')
    const artist_name = queryParam.get('artist_name')
    const current_page = parseInt(queryParam.get('page') || "1")
    
    try{
        const songInfoArray = await getArtistSongs(parseInt(artist_id!), artist_name!, current_page)
        return new Response(JSON.stringify({"song_array" : songInfoArray, "has_next_page": current_page + 1}))
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


