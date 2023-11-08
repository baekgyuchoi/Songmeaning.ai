export default function SongPage({ params }: {
    params: { song_slug : string } 
    }) {

    console.log(params.song_slug)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>hi</h1>
        <h1>{params.song_slug}</h1>
        <h2>hi</h2>
        </main>
    );
};




