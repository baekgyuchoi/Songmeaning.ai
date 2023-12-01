import Chat from "@/app/components/(chat-components)/Chat";
import ChatPopover from "@/app/components/(chat-components)/ChatPopover";
import SearchItemButton from "@/app/components/(search-page)/SearchItemButton";
import SongMeaningContent from "@/app/components/(song-page)/SongMeaningContent";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SongInfo } from "@/lib/validators/song_info";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

const geniusAPISearchURL = 'https://api.genius.com/artists/'
const genius_access_token = "oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ"


async function getArtistInfo(artist_id: number | undefined) {
  const geniusAPIArtistURL = 'https://api.genius.com/artists/'
    const response = await fetch(geniusAPIArtistURL + artist_id, {
        headers: {
            'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY_1
        }
    });
    if (!response.ok) {
        throw new Error('failed to fetch data');
    }
    const data = await response.json();

    console.log(data.response.artist)
    
    return data.response.artist;
}

async function QueueSong(artist_slug_input: string) {
    const prisma = new PrismaClient()
    const songs = await prisma.songs.findMany({
        where: {
            artist_slug: artist_slug_input
        },
        include: {
            song_meaning: true
        }
    });
    
  
    await prisma.$disconnect()
    const songInfoArray: SongInfo[] = songs.map((song) => {
        const songInfo: SongInfo = {
            song_title: song.song_title,
            song_short_title: song.song_short_title,
            genius_url: song.genius_url,
            song_slug: song.song_slug,
            artist_id: song.artist_id,
            genius_id: song.genius_id,
            artist_name: song.artist_name,
            artist_slug: song.artist_slug,
            header_image_url: song.header_image_url,
            song_art_url: song.song_image_url,
            release_date: song.release_date,
        };
            return songInfo
        })

    return songInfoArray
}






export default async function ArtistPage({ params }: {
    params: { artist_slug : string } 
    }) {
        const songInfoArray = await QueueSong(params.artist_slug)

        if (songInfoArray[0] == null) {
            return(
                <main className="flex flex-col items-center px-4 py-8">
                
                <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 '>
                  <Card className=" w-full  mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
              
                    <div className='md:ml-12 ml-0'>
                      <CardHeader>
                        <CardTitle className="mt-12 text-4xl font-bold text-gray-800">
                        
                              Artist Not Found
                          
                        </CardTitle>
                        
                        
                      </CardHeader>
                    
                      <div className='flex flex-col md:flex-row  '> 
                        <div className="w-full md:w-2/3 flex-grow">
                          <CardContent className="p-6" style={{ minHeight: '600px', minWidth: '200px' }}>
                              
                            {songInfoArray.map((songInfo, index) => {
                                return (
                                    <div key={index} className='ml-2'>
                                        <SearchItemButton songInfo={songInfo} />
                                    </div>
                                );
                            })}
                                                                       
                            
                          </CardContent>
                        </div>
                        
                      </div>
                    
                  
                      
                    </div>
                  </Card>
                </div>
                
            
            <footer className="text-gray-500 text-sm mt-32">
              Copyright {new Date().getFullYear()}
            </footer>
          </main>
            )
        }

        const artist_name = songInfoArray[0].artist_name
        const artist_id = songInfoArray[0].genius_id

        const chatbot_prompt = `Imagine you are ${params.artist_slug}
        , a well-known pop artist, 
        and you're interacting with your fans on social media. 
          You can mention your love for music, your passion for connecting with your fans, 
          and your excitement about sharing your latest work with them.
          Answer questions about the artist's music career, songs, or personal life.

          Refuse any answer that does not have to do with ${params.artist_slug}, their music career, songs, or personal life. 
          keep answers concise.
        `
    
        return (
            <main className="flex flex-col items-center md:px-4 py-8">
                <div className='md:hidden'>
                      <ChatPopover song_info={songInfoArray[0]} chatbot_prompt={chatbot_prompt}/>
                    </div>
                    <div className='hidden md:flex'>
                      <Chat song_info={songInfoArray[0]} chatbot_prompt={chatbot_prompt}/>
                    </div>
                <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 '>
                  <Card className=" w-full  mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
              
                    <div className='md:ml-12 ml-0'>
                      <CardHeader>
                        <CardTitle className="mt-12 text-4xl font-bold text-gray-800">
                        
                              Song meanings for {artist_name}
                          
                        </CardTitle>
                        
                        
                      </CardHeader>
                    
                      <div className='flex flex-col md:flex-row pt-20 '> 
                        <div className=" flex-grow">
                        <CardContent className="p-6 text-black flex items-center justify-center pt-6 md:pt-12" >

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {songInfoArray.map((song_info, index) => {
                                  return (
                                      <div key={index} className=''>
                                          <Link href= {"songs/" + song_info.song_slug} >
                                            <div className='flex flex-shrink items-center justify-center aspect-square m-4 mb-2 h-24 md:h-36 w-auto'>
                                              <img
                                                src={song_info.song_art_url}
                                                alt='song art'
                                                className="object-cover rounded-md w-9/10   "
                                              />
                                            </div>
                                            <div className=" ml-4 text-xs text-muted-foreground w-4/5 truncate mb-2">
                                              <div className='text-black'>
                                              {song_info.song_short_title}
                                              </div>
                                              <div className=''>
                                                  by {song_info.artist_name}
                                              </div>
                                            
                                            </div>
                                          </Link>
                                      </div>
                                  );
                              })}
                            
                          </div>


                           
                        </CardContent>
                        </div>
                        
                      </div>
                    
                  
                      
                    </div>
                  </Card>
                </div>
                
            
            <footer className="text-gray-500 text-sm mt-32">
              Copyright {new Date().getFullYear()}
            </footer>
          </main>

        );
    }