import * as Genius from "genius-lyrics";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



async function IsSongInDB(song_slug_input: string) {
   
    const song = await prisma.songs.findUnique({
        where: {
            song_slug: song_slug_input
        },
    });
    
    if (song != null) {
        return true;
    } else {
        return false;
    }
}

async function QueueSong(song_slug_input: string) {
    const song = await prisma.songs.findUnique({
        where: {
            song_slug: song_slug_input
        },
        include: {
            song_meaning: true
        }
    });
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
                await prisma.$disconnect()
                return (
                    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                        <h1>hi  </h1>
                        <h1>404: Invalid Song</h1>

                        <h2>hi </h2>
                    </main>
                )
            } else{
                const meaning = song_data?.song_meaning?.meaning
                let text1 = "TRUE"
                if (!song_in_db) {
                    text1 = "FALSE"
                }
                await prisma.$disconnect()
                // console.log(lyrics)
                return (
                    <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <h1>hi  {text1}</h1>
                    <h1>{ meaning }</h1>
        
                    <h2>hi </h2>
                    </main>
                );
            }

        }else {
            await prisma.$disconnect()
            return (
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <h1>hi  </h1>
                    <h1>404: Invalid URL</h1>

                    <h2>hi </h2>
                </main>
            )
        }

};




