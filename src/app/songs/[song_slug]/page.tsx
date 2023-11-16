import * as Genius from "genius-lyrics";
import { PrismaClient } from '@prisma/client'
import Chat from "@/app/components/(chat-components)/Chat";





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
                const song_name = song_data?.song_title

                const split_meaning = meaning?.split("\n")

                const chatbot_prompt = `Imagine you are ${artist_name}
                , a well-known pop artist, 
                and you're interacting with your fans on social media. 
                 You can mention your love for music, your passion for connecting with your fans, 
                 and your excitement about sharing your latest work with them.
                 Answer questions about the song's lyrics and meaning given below:
                 meaning: ${meaning}

                 lyrics: ${song_data.lyrics}
                
                 Refuse any answer that does not have to do with ${artist_name}, their music career, songs, or personal life. 
                 keep answers short and sweet.
                `

           
                
                // console.log(lyrics)
                return (
                    <main className="flex flex-col items-center px-4 py-8 pt-24">
                        <Chat song_info={song_data} chatbot_prompt = {chatbot_prompt} />

                    {/* Heading Section */}
                    <header className="flex justify-between w-full max-w-3xl">
                      <div className="flex items-center text-sm text-gray-500">
                        <h2 className="mr-2">by:</h2> 
                        <h3>{artist_name}</h3>
                      </div>
                
                      <p className="text-sm text-gray-400">
                        Created: {created_at}
                      </p>
                
                    </header>
                
                    {/* Main Content */}
                    <div className="max-w-2xl mt-8 text-gray-700">
                      
                      <h1 className="text-4xl font-bold mb-4">
                        Meaning of: {song_name}
                      </h1>
                      
                      {split_meaning?.map((paragraph, i) => (
                        <p
                          key={i}
                          className="mt-4 text-lg transition duration-300 hover:text-indigo-500" 
                        >
                          {paragraph}
                        </p>
                      ))}
                
                    </div>
                    
                    {/* Footer */}
                    <footer className="text-gray-500 text-sm mt-12">
                      Copyright {new Date().getFullYear()}
                    </footer>
                
                  </main>
                    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    // <h1>Heading Bar with - by: {artist_name}, created at: {created_at} </h1>

                    // <div className="">
                    //     <h1 className="text-4xl font-bold text-gray-800">
                    //         Meaning of: {song_name} 
                    //     </h1>
                    //     <div className="mt-8">
                    //         {split_meaning?.map((item, index)=> (
                    //             <p key={index} className="mt-4 text-lg text-gray-600">{item}</p>
                    //         ))}
                    //     </div>

                    // </div>
        
                    // <h2> copyright </h2>
                    // </main>
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




