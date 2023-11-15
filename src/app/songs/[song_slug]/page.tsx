import * as Genius from "genius-lyrics";
import { PrismaClient } from '@prisma/client'





async function IsSongInDB(song_slug_input: string) {
    const prisma = new PrismaClient()
    const song = await prisma.songs.findUnique({
        where: {
            song_slug: song_slug_input
        },
    });
    await prisma.$disconnect()
    if (song != null) {
        return true;
    } else {
        return false;
    }
}

async function QueueSong(song_slug_input: string) {
    const prisma = new PrismaClient()
    const song = await prisma.songs.findUnique({
        where: {
            song_slug: song_slug_input
        },
        include: {
            song_meaning: true
        }
    });
    await prisma.$disconnect()
    return song
}

export default async function SongPage({ params }: {
    params: { song_slug : string } 
    }) {
        // const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
        // const search = await Client.songs.search(params.song_slug);
        // const lyrics = await search[0].lyrics();
        const song_in_db = await IsSongInDB(params.song_slug)
        

        if (song_in_db) {
            const song_data = await QueueSong(params.song_slug)
            
            if (!song_data?.isValid){
                
                return (
                    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                        <h1>hi  </h1>
                        <h1>404: Invalid Song</h1>

                        <h2>hi </h2>
                    </main>
                )
            } else{
                const meaning = song_data?.song_meaning?.meaning
                const created_at = song_data?.song_meaning?.createdAt.toDateString()
                const artist_name = song_data?.artist_name
                
                
                // console.log(lyrics)
                return (
                    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <h1>created at: {created_at} </h1>
                    <h1>{ meaning }</h1>
        
                    <h2>by: {artist_name} </h2>
                    </main>
                );
            }

        }else {
        
            return (
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <h1>hi  </h1>
                    <h1>404: Invalid URL</h1>

                    <h2>hi </h2>
                </main>
            )
        }

};




