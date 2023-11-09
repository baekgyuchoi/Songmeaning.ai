import * as Genius from "genius-lyrics";




export default async function SongPage({ params }: {
    params: { song_slug : string } 
    }) {
        const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
        const SongsClient = Client.songs;
        SongsClient.get(378195).then(song => console.log(song));
        const search = await Client.songs.search(params.song_slug);
        const lyrics = await search[0].lyrics();
        // console.log(lyrics)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>hi</h1>
        <h1>{ lyrics }</h1>
        <h2>hi</h2>
        </main>
    );
};




