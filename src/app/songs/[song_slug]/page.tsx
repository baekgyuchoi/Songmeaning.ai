
import { PrismaClient } from '@prisma/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SongInfo } from '@/lib/validators/song_info';
import { Suspense } from 'react';
import SongMeaningContent from '@/app/components/(song-page)/SongMeaningContent';
import TrendingChart from '@/app/components/(song-tables)/TrendingChart';
import MoreFromArtist from '@/app/components/(song-tables)/MoreFromArtist';
import ArtistLink from '@/app/components/(song-page)/ArtistLink';
import { SongData } from '@/lib/validators/song_data_response';
import SongFAQ from '@/app/components/(song-page)/(faq)/SongFAQ';
import FormattedMeaningContent from '@/app/components/(song-page)/FormattedMeaningContent';
import LoadingFAQ from '@/app/components/(song-page)/(faq)/LoadingFAQ';
import Link from 'next/link';


type formatted_meaning = {
  "summary_analysis": string,
  "emotional_journey": string,
  "quotes": string,
  "conclusion": string,
}

async function SongInGenius(song_id: number) {
  if (song_id == null) {
    return null
  }
  const geniusAPISearchURL = 'https://api.genius.com/songs/'
    const response = await fetch(geniusAPISearchURL + song_id, {
        headers: {
            'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY_1,
        }
    });
    
    const data = await response.json();
    if (data.response == null){
      return null
    }
    
    const song_info: SongInfo = {
      song_title: data.response.song.full_title,
      song_short_title: data.response.song.title,
      genius_url: data.response.song.url,
      song_slug: data.response.song.path.split('/').pop()?.split('-lyrics')[0].split('-annotated')[0],
      genius_id: parseInt(data.response.song.id),
      artist_name: data.response.song.primary_artist.name,
      artist_id: parseInt(data.response.song.primary_artist.id),
      artist_slug: data.response.song.primary_artist.url.split('/').pop(),
      header_image_url: data.response.song.header_image_url,
      song_art_url: data.response.song.song_art_image_url,
      release_date: data.response.song.release_date_for_display || "",
    }

    return song_info
}



async function PostSongToDB(song_info: SongInfo) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  const song_in_db = await prisma.songs.findUnique({
      where: {
          song_slug: song_info.song_slug,
          },
      })
  if (song_in_db != null) {
      await prisma.$disconnect()
      if (song_in_db.isValid === false) {
          return "Error - song is not valid "
      }
      return "Error - song already exists"
  }
 
  
  await prisma.songs.create({
      data: {
          song_slug: song_info.song_slug,
          artist_name: song_info.artist_name,
          song_title: song_info.song_title,
          genius_id: song_info.genius_id,
          artist_id: song_info.artist_id,
          artist_slug: song_info.artist_slug,
          genius_url: song_info.genius_url,
          song_short_title: song_info.song_short_title,
          header_image_url: song_info.header_image_url,
          song_image_url: song_info.song_art_url,
          release_date: song_info.release_date || "",
      }
  })
  await prisma.$disconnect()
  return "Success"
}

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


 

export default async function SongPage({ params, searchParams }: {
    params: { song_slug : string };
    searchParams?: { [key: string]: string | undefined}; 
    }) {
        // const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
        // const search = await Client.songs.search(params.song_slug);
        // const lyrics = await search[0].lyrics();
        
        let is_meaning_valid = false
        const searchQuery = searchParams?.song;

        const song_id = parseInt(searchQuery!)
        console.log(song_id)

    
        let song_data = await QueueSong(params.song_slug) as SongData
        if (song_data == null) {
          const song_genius = await SongInGenius(song_id)
          const song_from_genius = song_genius as SongInfo
          const song_data_genius: SongData = {
            song_slug: song_from_genius.song_slug,
            song_title: song_from_genius.song_title,
            song_short_title: song_from_genius.song_short_title,
            artist_name: song_from_genius.artist_name,
            artist_id: song_from_genius.artist_id,
            artist_slug: song_from_genius.artist_slug,
            genius_id: song_from_genius.genius_id,
            genius_url: song_from_genius.genius_url,
            header_image_url: song_from_genius.header_image_url || "",
            song_image_url: song_from_genius.song_art_url || "",
            release_date: song_from_genius.release_date || "",
            isValid: true,
            id: 0,
            lyrics: null,
            two_word_description: '',
            badges: [],
            song_meaning: null
          }
         


          if (song_from_genius == null) {
            return (
        
              <div className="flex min-h-screen font-mono flex-col items-center justify-center pb-48">
                
                
                <h1>404: Error</h1>
                
                
              
              </div>
            )
          }
          console.log(song_data_genius)
        await PostSongToDB(song_from_genius)
          
          song_data = song_data_genius
        }

        
          
            
          const meaning = song_data?.song_meaning?.meaning
          if (meaning != null) {
              is_meaning_valid = true
          }
          
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
              release_date: song_data?.release_date || "",
              song_short_title: song_data?.song_short_title,
          }

          console.log(song_info)
          const song_meaning_split = meaning?.split("\n")
          
          let formatted_meaning : formatted_meaning = {} as formatted_meaning
      
          let text: string[] = []
          
          if (song_meaning_split != null) {
            for(let paragraph of song_meaning_split){
              if (paragraph == "") {
                continue
              }

        
              if (paragraph == "Summary Analysis:") { 
                
                

              }
              else if (paragraph.includes("Emotional Journey:")) {
                formatted_meaning.summary_analysis = text.join("\n")
                text = []
                

              }
              else if (paragraph.includes("Conclusion:")) {
                formatted_meaning.quotes = text.join("\n")
                text = []

              }
              else if (paragraph.includes("Quote Analysis:")) {
                formatted_meaning.emotional_journey = text.join("\n")
                text = []
                

              }
              else{
                text.push(paragraph)
              }
            }
            formatted_meaning.conclusion = text.join("\n")
            
          }


          return (
              <main className=" flex flex-col items-center md:px-4 py-8 ">
                  

                  <div className='md:mx-auto max-w-6xl px-0 md:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 '>
                    <Card className=" w-full  mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10  md:p-16">
                
                      <div className=''>
                        <CardHeader>
                          <CardTitle className="mt-12 mb-6 text-4xl font-bold text-gray-800 flex justify-between">
                            <div>
                            
                              <div>
                                <p>{song_name}</p> 
                                <div className="flex justify-start items-start text-gray-600 hover:text-gray-500 mt-2"> 
                                  <Link
                                      href={`/artists/${song_data.artist_slug}/?artist=${song_data.artist_id}`}
                                      className='w-full overflow-hidden text-gray-600' 
                                    
                                    >   
                                  
                                      {song_data.artist_name}
                                  
                                  </Link>
                                </div>
                              </div>
                            </div>
                            
                          </CardTitle>
                        </CardHeader>
                      
                        <div className='flex flex-col  items-center '> 
                          <div className="w-full md:pr-4 md:mr-4 md:pl-4">
                            <CardContent className="p-1 md:p-3 flex flex-col items-center  mb-5" style={{ minHeight: '600px', minWidth: '200px' }}>
                                {
                                  song_data?.isValid ? (
                                    <div className='w-screen p-4 sm:p-0 sm:w-full'>
                                    {
                                      is_meaning_valid ? (
                                        // <>{split_meaning?.map((paragraph, i) => (
                                        //   <p
                                        //     key={i}
                                        //     className="text-gray-800 mt-4 text-lg transition duration-300 " 
                                        //   >
                                        //     {paragraph}
                                        //   </p>
                                        // ))}</>
                                        <FormattedMeaningContent formatted_meaning={formatted_meaning} />
                                      ) : (
                                        <Suspense fallback={<div className='flex items-center container justify-center'>Loading feed...</div>}>
                                          <SongMeaningContent song_info={song_info} />
                                        </Suspense>
                                      )
                                    } 
                                    </div> 
                                  ) : (
                                    <div className='container flex items-center justify-center mt-10'>
                                      <Card className="mb-0.5 flex-1  bg-white px-4 pt-4 pb-4 sm:mb-8 sm:flex-initial rounded-md md:px-10 md:pt-9 md:pb-10 ">
                      
                                        <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                                          <CardTitle className="text-xl font-bold text-gray-800">This song is invalid</CardTitle>
                                          
                                        </CardHeader>
                                  
                                        <CardContent className="p-6 text-gray-700">
                                          <p className="text-gray-700">Song does not have lyrics or</p>
                                          <p>  Data corruption </p>
                                        </CardContent>
                                  
                                        
                                        
                                      </Card>
                                    </div>
                                  )
                                }
                                                                              
                              
                            </CardContent>
                          </div>
                        
                          <div className='w-screen md:w-full text-black mt-10 mb-10'>
                            
                            <CardContent>
                              <Suspense fallback={<LoadingFAQ />}>
                                {
                                  is_meaning_valid ? (
                                    <><SongFAQ songMeaning={meaning!} songData={song_data} /></>
                                  ) : (
                                    <></>
                                  )
                                } 
                              </Suspense>
                            </CardContent>
                          
                          </div>
                          
                          
                          <div className='  flex text-black flex-col lg:flex-row items-start '>

                            <CardContent className="">                               
                              <Suspense fallback={<p>Loading feed...</p>}>
                                <MoreFromArtist artist_id={song_data.artist_id} song_slug={song_data.song_slug} artist_name={song_data.artist_name} artist_slug={song_data.artist_slug} />
                              </Suspense>
                            </CardContent>
                            
                            <CardContent className="">
                              <Suspense fallback={<p>Loading feed...</p>}>
                                <TrendingChart />
                              </Suspense>
                            </CardContent>
                            
                            
                          
                          </div>
                        </div>
                      
                    
                        
                      </div>
                    </Card>
                  </div>
                  
              
              <div className="flex items-center justify-center mt-20">
                <footer className="text-gray-500 text-sm">2023 Songmeaning.AI</footer>
              </div>
            </main>

          );
            

      


       


       




        }






