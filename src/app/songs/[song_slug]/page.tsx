
import { PrismaClient } from '@prisma/client'
import Chat from "@/app/components/(chat-components)/Chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SongInfo } from '@/lib/validators/song_info';
import SearchItemButton from '@/app/components/(search-page)/SearchItemButton';
import { Suspense } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ArtistSongsScroll from '@/app/components/(song-page)/ArtistSongsScroll';
import SongMeaningContent from '@/app/components/(song-page)/SongMeaningContent';
import { Car } from 'lucide-react';
import TrendingSongs from '@/app/components/TrendingSongs';







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
    if (song != null) {
      await prisma.songs.update({
        where: {
            song_slug: song_slug_input
        },
        data: {
            viewCount: song?.viewCount + 1
        }
    })
    }
  
    await prisma.$disconnect()
    return song
}



export default async function SongPage({ params }: {
    params: { song_slug : string } 
    }) {
        // const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
        // const search = await Client.songs.search(params.song_slug);
        // const lyrics = await search[0].lyrics();
        
        let is_meaning_valid = false

        

    
        const song_data = await QueueSong(params.song_slug)
          
          
        
        console.log(song_data?.isValid)
        if (song_data != null){
          console.log("songs in db")
            
            const meaning = song_data?.song_meaning?.meaning
            if (meaning != null) {
                is_meaning_valid = true
            }
            const created_at = song_data?.song_meaning?.createdAt.toDateString()
            const artist_name = song_data?.artist_name
            const song_name = song_data?.song_title
            const song_info: SongInfo = {
                song_slug: song_data?.song_slug,
                song_title: song_data?.song_title,  
                artist_name: song_data?.artist_name, 
                artist_slug: song_data?.artist_slug,
                genius_id: song_data?.genius_id,
                genius_url: song_data?.genius_url,
            }
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
                <main className="flex flex-col items-center px-4 py-8 pt-20">
                    <Chat song_info={song_data} chatbot_prompt = {chatbot_prompt} />
              
                    <Card className=" w-full md:w-2/3 mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
                
                      <div className='md:ml-12 ml-0'>
                        <CardHeader>
                          <CardTitle className="mt-12 text-4xl font-bold text-gray-800">
                          
                                Meaning of: {song_name}
                            
                          </CardTitle>
                          <div className=" flex justify-between w-2/3">
                            <CardDescription className="mt-16">
                              <>by: {artist_name}</>
                            </CardDescription>
                            <CardDescription className="mt-16">
                              <>Created: {created_at}</>
                            </CardDescription>
                          </div>
                          
                        </CardHeader>
                      
                        <div className='flex flex-col md:flex-row  '> 
                          <div className="w-full md:w-2/3">
                            <CardContent className="p-6" style={{ minHeight: '600px', minWidth: '200px' }}>
                                {
                                  song_data?.isValid ? (
                                    <>
                                    {
                                      is_meaning_valid ? (
                                        <>{split_meaning?.map((paragraph, i) => (
                                          <p
                                            key={i}
                                            className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-500" 
                                          >
                                            {paragraph}
                                          </p>
                                        ))}</>
                                      ) : (
                                        <Suspense fallback={<div className='flex items-center bg-black'>Loading feed...</div>}>
                                          <SongMeaningContent song_info={song_info} />
                                        </Suspense>
                                      )
                                    } 
                                    </> 
                                  ) : (
                                    <Card className="mb-0.5 flex-1 rounded-t-3xl bg-white from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
                    
                                      <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                                        <CardTitle className="text-xl font-bold text-gray-800">Card Title</CardTitle>
                                        <CardDescription className="text-gray-600">Card Description</CardDescription>
                                      </CardHeader>
                                
                                      <CardContent className="p-6 text-gray-700">
                                        <p className="text-gray-700">Card Content</p>
                                        <p>  Song is not Valid</p>
                                      </CardContent>
                                
                                      <CardFooter className="bg-beige-200 rounded-b-lg px-6 py-4">  
                                        <p className="text-gray-700">Card Footer</p>
                                      </CardFooter>
                                      
                                    </Card>
                                  )
                                }
                                                                              
                              
                            </CardContent>
                          </div>
                          <div className='w-full md:w-1/3  flex flex-col'>
                            <CardContent className="">
                                <Suspense fallback={<p>Loading feed...</p>}>
                                  <TrendingSongs />
                                </Suspense>
                            </CardContent>
                            <CardContent className="mx-auto">
                              <div className='text-gray-800 '>
                                <h1 className="flex justify-center text-2xl text-gray-800 mb-3">
                                    More by {artist_name}
                                </h1>   
                                <Suspense fallback={<p>Loading feed...</p>}>
                                  <ArtistSongsScroll 
                                    song_slug={song_data.song_slug} 
                                    artist_slug={song_data.artist_slug}
                                    />
                                </Suspense>
                              </div>
                            </CardContent>
                           
                          </div>
                        </div>
                      
                    
                        <CardFooter className="bg-beige-200 rounded-b-lg px-6 mt-36 py-4">  
                          <p className="text-gray-700">Card Footer</p>
                        </CardFooter>
                      </div>
                    </Card>
                    
                    
                
                <footer className="text-gray-500 text-sm mt-32">
                  Copyright {new Date().getFullYear()}
                </footer>
              </main>

            );
            

        }

        return (
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                  <h1>hi</h1>
                  
                  <Card className="mb-0.5 flex-1 rounded-t-3xl bg-white from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
                    
                    <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                      <CardTitle className="text-xl font-bold text-gray-800">Card Title</CardTitle>
                      <CardDescription className="text-gray-600">Card Description</CardDescription>
                    </CardHeader>
              
                    <CardContent className="p-6 text-gray-700">
                      <p className="text-gray-700">Card Content</p>
                      <p> This URL is invalid</p>
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






