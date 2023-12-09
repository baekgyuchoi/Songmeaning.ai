
import { PrismaClient } from '@prisma/client'
import Chat from "@/app/components/(chat-components)/Chat";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SongInfo } from '@/lib/validators/song_info';
import SearchItemButton from '@/app/components/(search-page)/SearchItemButton';
import { Suspense } from 'react';
import SongMeaningContent from '@/app/components/(song-page)/SongMeaningContent';
import { Car } from 'lucide-react';
import TrendingSongs from '@/app/components/TrendingSongs';
import TrendingChart from '@/app/components/(song-tables)/TrendingChart';
import MoreFromArtist from '@/app/components/(song-tables)/MoreFromArtist';
import SongBadges from '@/app/components/(song-page)/SongBadges';
import Link from 'next/link';
import ChatPopover from '@/app/components/(chat-components)/ChatPopover';
import ArtistLink from '@/app/components/(song-page)/ArtistLink';
import SongChat from '@/app/components/(chat-components)/SongChat';
import { SongData } from '@/lib/validators/song_data_response';
import SongFAQ from '@/app/components/(song-page)/(faq)/SongFAQ';




async function QueueSong(song_slug_input: string) {
    const prisma = new PrismaClient()
    const song = await prisma.songs.findUnique({
        where: {
            song_slug: song_slug_input
        },
        include: {
            song_meaning: true,
            badges: true
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

      

    
        const song_data = await QueueSong(params.song_slug) as SongData
          
        
        console.log(song_data?.lyrics)
        if (song_data != null){
          console.log("songs in db")
            
            const meaning = song_data?.song_meaning?.meaning
            if (meaning != null) {
                is_meaning_valid = true
            }
            const created_at = song_data?.song_meaning?.createdAt.toDateString().split(" ").slice(1).join(" ")
            const artist_name = song_data?.artist_name
            const song_name = song_data?.song_short_title
            const song_info: SongInfo = {
                song_slug: song_data?.song_slug,
                song_title: song_data?.song_title,  
                artist_name: song_data?.artist_name, 
                artist_id: song_data?.artist_id,
                artist_slug: song_data?.artist_slug,
                genius_id: song_data?.genius_id,
                genius_url: song_data?.genius_url,
                header_image_url: song_data?.header_image_url,
                song_art_url: song_data?.song_image_url,
                release_date: song_data.release_date || "",
                song_short_title: song_data?.song_short_title,
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
        
            console.log(song_data?.song_short_title)



            return (
                <main className="min-w-screen flex flex-col items-center md:px-4 py-8 ">
                    

                    <div className='md:mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 '>
                      <Card className=" w-full  mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10  md:p-16">
                  
                        <div className=''>
                          <CardHeader>
                            <CardTitle className="mt-12 text-4xl font-bold text-gray-800 flex justify-between">
                              <div>
                              
                                <div><p>{song_name}&nbsp;</p> <div className="flex text-gray-600 hover:text-gray-500"> <ArtistLink artist_id={song_info.artist_id} artist_name={song_info.artist_name} artist_slug={song_info.artist_slug}></ArtistLink></div></div>
                              </div>
                              
                            </CardTitle>
                            
                            <div className="flex justify-start w-full ">
                              <CardDescription className="mt-16">
                                <>Created: {created_at}</>
                              </CardDescription>
                            </div>
                            
                          </CardHeader>
                        
                          <div className='flex flex-col  items-center '> 
                            <div className="w-full md:pr-4 md:mr-4 md:pl-4">
                              <CardContent className="p-1 md:p-3  mb-12" style={{ minHeight: '600px', minWidth: '200px' }}>
                                  {
                                    song_data?.isValid ? (
                                      <div className='w-full'>
                                      {
                                        is_meaning_valid ? (
                                          <>{split_meaning?.map((paragraph, i) => (
                                            <p
                                              key={i}
                                              className="text-gray-800 mt-4 text-lg transition duration-300 hover:text-indigo-700 md:hover:text-indigo-500" 
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
                                      </div> 
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
                                  
                                       
                                        
                                      </Card>
                                    )
                                  }
                                                                                
                                
                              </CardContent>
                            </div>
                            <div className='w-screen md:w-full text-black mb-10'>
                              
                              <CardContent>
                                {
                                  is_meaning_valid ? (
                                    <><SongFAQ songMeaning={meaning!} songData={song_data} /></>
                                  ) : (
                                    <></>
                                  )
                                } 
                              </CardContent>
                            
                            </div>
                            <div className='flex w-full '>
                              <CardContent>
                              <div className='flex flex-col text-black items-start justify-between ml-10'>
                                
                                <div className='flex items-center'>
                                  
                                  <h1 className='text-bold text-black p-2 '> Badges  </h1> <span className='text-gray-500 text-sm'> given by ai</span>
                                </div>
                                <Suspense fallback={<p></p>}>
                                  <SongBadges songData = {song_data}/>
                                </Suspense>
                              </div>
                              </CardContent>
                              <div>

                              </div>
                 
                            </div>
                            
                            <div className='  flex text-black flex-col lg:flex-row items-start '>
                              
                              <CardContent className="">
                                <Suspense fallback={<p>Loading feed...</p>}>
                                  <TrendingChart />
                                </Suspense>
                              </CardContent>
                              
                              <CardContent className="">                               
                                <Suspense fallback={<p>Loading feed...</p>}>
                                  <MoreFromArtist artist_id={song_data.artist_id} song_slug={song_data.song_slug} artist_name={song_data.artist_name} artist_slug={song_data.artist_slug} />
                                </Suspense>
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

        return (
      
            <div className="flex min-h-screen font-mono flex-col items-center justify-center pb-48">
              
              
              <h1>404: Invalid Song</h1>
              
              
             
            </div>
          )
        }






