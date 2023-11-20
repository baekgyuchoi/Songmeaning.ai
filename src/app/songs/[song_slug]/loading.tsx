export default async function SongLoadingPage({ params }: {
    params: { song_slug : string } 
    }) {
        // console.log(lyrics)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1></h1>
        <h1
           className="bg-transparent text-gray font-bold text-4xl tracking-tight hover:text-gray-300 focus:outline-none focus:shadow-outline"
        > Loading ...  </h1>
        <h2></h2>
        </main>
    );
};