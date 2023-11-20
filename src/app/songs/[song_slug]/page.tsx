
import { PrismaClient } from '@prisma/client'
import Chat from "@/app/components/(chat-components)/Chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SongInfo } from '@/lib/validators/song_info';
import SearchItemButton from '@/app/components/(search-page)/SearchItemButton';



async function QueueArtist(artist_slug_input: string) {
  const prisma = new PrismaClient()
    const artist_songs = await prisma.songs.findMany({
        where: {
            artist_slug: artist_slug_input
        },
    });
    let songs: SongInfo[] = []
    
    if (artist_songs != null) {
      for(let i = 0; i< artist_songs.length; i++){
        let artist_song = artist_songs[i]
        let song: SongInfo = {
          song_slug: artist_song?.song_slug,
          song_title: artist_song?.song_title,  
          artist_name: artist_song?.artist_name, 
          artist_slug: artist_song?.artist_slug,
          genius_id: artist_song?.genius_id,
          genius_url: artist_song?.genius_url,
        }
        songs.push(song)
      }
      return songs
    }else{
      console.log("no artist error")
      return null
    }
}

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
            
            
            
            if (song_data?.isValid){
                const artist_songs = await QueueArtist(song_data.artist_slug)
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
                        <Card className="w-4/5 mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
                    
                          {/* <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                            <CardTitle className="text-xl font-bold text-gray-800">Card Title</CardTitle>
                            <CardDescription className="text-gray-600">Card Description</CardDescription>
                          </CardHeader> */}
                          <CardHeader className="w-2/3">
                            <CardTitle className="text-4xl font-bold text-gray-800">
                             
                                  Meaning of: {song_name}
                              
                            </CardTitle>
                            <div className=" flex justify-between w-full max-w-2xl">
                              <CardDescription className="mt-4">
                                <>by: {artist_name}</>
                              </CardDescription>
                              <CardDescription className="mt-4">
                                <>Created: {created_at}</>
                              </CardDescription>
                            </div>
                            
                          </CardHeader>
                          <div className='flex flex-row'> 
                            <CardContent className="p-6 w-2/3">
                              {split_meaning?.map((paragraph, i) => (
                                <p
                                  key={i}
                                  className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-500" 
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </CardContent>
                            <CardContent className="w-1/3">
                              <div className='text-gray-800 max-w-xl'>
                                <p className='mb-6'>More songs by {artist_name}:</p>
                              {artist_songs?.map((song, i) => {
                                if(song.song_slug != params.song_slug) {
                                  return(
                                  <div key= {i} className='mb-2 flex bg-transparent text-gray font-bold tracking-tight text-xl sm:text-xl hover:text-gray-300 focus:outline-none focus:shadow-outline'>
                                    <SearchItemButton songInfo={song} />
                                  </div>)
                                }
                                
                              })}
                            </div>
                            </CardContent>
                          </div>
                      
                          <CardFooter className="bg-beige-200 rounded-b-lg px-6 py-4">  
                            <p className="text-gray-700">Card Footer</p>
                          </CardFooter>
                          
                        </Card>
                        
                    
                    <footer className="text-gray-500 text-sm mt-32">
                      Copyright {new Date().getFullYear()}
                    </footer>
                  </main>
    
                );
            }

        }

        return (
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                  <h1>hi</h1>
                  
                  <Card className="mb-0.5 flex-1 rounded-t-3xl bg-gradient-to-tr from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
                    
                    <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                      <CardTitle className="text-xl font-bold text-gray-800">Card Title</CardTitle>
                      <CardDescription className="text-gray-600">Card Description</CardDescription>
                    </CardHeader>
              
                    <CardContent className="p-6">
                      <p className="text-gray-700">Card Content</p>
                    </CardContent>
              
                    <CardFooter className="bg-beige-200 rounded-b-lg px-6 py-4">  
                      <p className="text-gray-700">Card Footer</p>
                    </CardFooter>
                    
                  </Card>
                  
                  <h1>404: Invalid URL</h1>
              
                  <h2>hi</h2>
                  <footer className="text-gray-500 text-sm mt-32">
                    Copyright {new Date().getFullYear()}
                  </footer>
                </main>
              )
        }






