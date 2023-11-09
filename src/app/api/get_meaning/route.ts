import * as Genius from "genius-lyrics";

const genius_api_key = "oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ"

//maybe POST to alter databasenext c
export async function GET(request: Request) {
    const url = new URL(request.url)
    const queryParam = url.searchParams
    const song_id = parseInt(queryParam.get('q') || "0")
    if (song_id == 0) {
        return new Response("Invalid song id")
    }
    // query if song_id exists in database or use song_slug instead
    const Client = new Genius.Client(genius_api_key);
    const SongsClient = Client.songs;
    const searchSong = await SongsClient.get(song_id)
    const lyrics = await searchSong.lyrics();

    return new Response(lyrics)
}