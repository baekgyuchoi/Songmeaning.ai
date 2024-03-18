
import prisma from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SongInfo } from '@/lib/validators/song_info';
import { Suspense } from 'react';
import TrendingChart from '@/app/components/(song-tables)/TrendingChart';
import MoreFromArtist from '@/app/components/(song-tables)/MoreFromArtist';
import { SongData } from '@/lib/validators/song_data_response';
import Link from 'next/link';
import FooterContainer from '@/app/components/(footer)/FooterContainer';
import { Metadata } from 'next';
import ShareContainer from '@/app/components/(song-page)/(like/share)/ShareContainer';
import ShareModal from '@/app/components/(song-page)/(like/share)/ShareModal';
import ContentBlock from '@/app/components/(song-page)/(content-blocks)/ContentBlock';
import BackgroundContentBlock from '@/app/components/(song-page)/(content-blocks)/BackgroundContentBlock';
import { Loader2 } from 'lucide-react';


export const maxDuration = 50


export async function generateMetadata({
  params,
}: {
  params: {song_slug: string};
}): Promise<Metadata> {
  const song_slug  = params.song_slug;
  // read route params
  const song_db = await prisma.songs.findUnique({
    where: {
      song_slug: song_slug
    },
    include: {
      song_meaning_structured: {
        include: {
          background: true,
  
        }
      }
   
    }
  })

  let song_description = ""
  
  song_description = song_db?.song_meaning_structured?.intro || ""
  
  // fetch data
 
  if (song_db == null || song_description == "") {
    return {
      metadataBase: new URL("https://www.songmeaning.ai/songs/" + song_slug),
      title: `${song_slug.split("-").join(" ")} Lyrics Meaning - SongMeaning.AI`,
      description: `Uncover the deepr meaning behind the lyrics of ${song_slug.split("-").join(" ")}`,
      alternates: {
        canonical: '/'
      },

     
    }
  }
  return {
    metadataBase: new URL("https://www.songmeaning.ai/songs/" + song_slug),
    title: `${song_db!.song_short_title} by ${song_db!.artist_name} Lyrics Meaning - SongMeaning.AI`,
    description: song_description,
    alternates: {
      canonical: '/'
    }
    }
  };




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


  const song_in_db = await prisma.songs.findUnique({
      where: {
          song_slug: song_info.song_slug,
          },
      })
  if (song_in_db != null) {
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
  return "Success"
}

async function QueueSong(song_slug_input: string) {
    const song = await prisma.songs.findUnique({
        where: {
            song_slug: song_slug_input
        },
        include: {
            song_meaning: true,
            song_meaning_preview: true,
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
  
    return song
}


 

export default async function SongPage({ params, searchParams }: {
    params: { song_slug : string };
    searchParams?: { [key: string]: string | null}; 
    }) {
        // const Client = new Genius.Client("oNwFSu_AIjtrw3owTLM9p_RYc2o9EjyJTNv9Lf05GDgl7adlODR9DQwiUlz8FzDZ");
        // const search = await Client.songs.search(params.song_slug);
        // const lyrics = await search[0].lyrics();
        
        let is_meaning_valid = true
        let is_preview_valid = false

        const searchQuery = searchParams?.song;

        const song_id = parseInt(searchQuery!)

    
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
            song_meaning: null,
            song_meaning_preview:null
          }
         


          if (song_from_genius == null) {
            return (
        
              <div className="flex min-h-screen font-mono flex-col items-center justify-center pb-48">
                
                
                <p>404: Error</p>
                
                
              
              </div>
            )
          }
        await PostSongToDB(song_from_genius)
          
          song_data = song_data_genius
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
            
  

          
       
   
          
          



          return (
              <main className="">
                
                  <div className='flex flex-col items-center md:px-4 py-8'>

                  

                    <div className='md:mx-auto max-w-6xl px-0 md:px-6 lg:px-8  flex w-full flex-1 flex-col pl-0 pr-0 '>
                      <Card className="w-full mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl">
                        <CardHeader className='relative border-1 border-b-4 border-purple-800/25 bg-gray-50 rounded-t-3xl sm:rounded-b-3xl flex flex-col items-center sm:flex-row mb-4 px-4 sm:py-10 sm:px-10'>
                            
                              <div className='absolute inset-0 bg-cover bg-center rounded-lg rounded-t-3xl sm:rounded-b-3xl' style={{ backgroundImage: `url(${song_data.header_image_url})`, opacity: 0.25 }}>

                              </div>
                        
                              <div className='w-56 sm:w-72 h-56 rounded-lg bg-purple-500/25 relative z-10'>

                                <img 
                                  src={song_data.song_image_url}
                                  alt='song art'
                                  className="object-cover w-56 h-56 p-2  "
                                >
                                </img>
                              </div>
                            
                              <CardTitle className="relative z-10 w-full mt-8 p-3 text-center sm:text-left sm:ml-3 sm:mt-12 mb-6 text-4xl  text-gray-800">
                              
                                
                                  <div className='flex flex-col items-center sm:items-start justify-start h-fill '>
                                    <h1 className='font-bold'>{song_name}</h1> 
                                    <div className="flex justify-center sm: items-start text-xl sm:ml-1 text-gray-600 hover:text-gray-500 mt-2 mb-4"> 
                                      <Link
                                          href={`/artists/${song_data.artist_slug}/?artist=${song_data.artist_id}`}
                                          className='w-full overflow-hidden underline text-gray-500' 
                                        
                                        >   
                                      
                                          {song_data.artist_name}
                                      
                                      </Link>
                                    </div>
                                  </div>
                                  <div className='flex flex-col justify-center '>
                                    <div className='text-base sm:ml-1 flex flex-col font-mono items-start'>
                                      {song_data.release_date == "" || song_data.release_date == null ? (
                                        <p>Released: N/A </p>
                                      ) : (
                                        <p>Released:  {song_data.release_date}</p>
                                      )}
                                       
                                        {(is_meaning_valid) ? (
                                          <Suspense fallback={<div className='flex items-center justify-center'><Loader2 className='animate-spin'></Loader2></div>}>
                                            <BackgroundContentBlock song_info={song_info} />
                                          </Suspense>
                                        ) : (
                                          <></>
                                          )}
                                       
                                    </div>
                                    <div className='mt-4 underline'>
                                      <div className='animate-pulse'>
                                        <ShareModal song_data={song_data} song_art_url={song_data.header_image_url!}  song_slug={song_data.song_slug} song_title={song_data.song_title}/>
                                      </div>
                                    </div>
                                  </div>
                                  
                                
                              </CardTitle>
                            </CardHeader>
                        <div className='px-8 pt-7 pb-8  md:px-10 md:pt-9 md:pb-10  md:p-16'>
                          
                          <div className='flex flex-col  items-center '> 
                            <div className="w-full md:px-8 md:mr-4 ">
                              <CardContent className="p-1 md:p-3 flex flex-col items-center  mb-5" style={{ minHeight: '600px', minWidth: '200px' }}>
                                  {
                                    song_data?.isValid ? (
                                      <div className='w-screen p-4 sm:p-0 sm:w-full '>
                                        {/* {is_meaning_valid || is_preview_valid ? (
                                          <>
                                            <SongMeaningTab song_meaning={song_meaning_json} song_meaning_preview={song_meaning_preview_json}/>
                             
                                          </>

                                        ):(
                                          <>
                                            <LoadingQueue songInfo={song_info} />
                                            <SongMeaningContent song_info={song_info} />
                                          </>
                                        )} */}

                                        {/* {is_meaning_valid? (
                                          <SongMeaningTab is_meaning_flagged={is_meaning_flagged || false} is_preview_flagged={is_preview_flagged || false} song_meaning={song_meaning_json} song_meaning_preview={song_meaning_preview_json} song_info={song_info}/>
                                        ) : (
                                          <Suspense fallback={<p>Loading...</p>}>
                                            <SongMeaningContentBlock />
                                          </Suspense>
                                        )} */}
                                        
                                        <ContentBlock song_info={song_info} song_data={song_data} />
                                        {/* <StructuredContentBlock song_info={song_info} /> */}
                                        {/* <SongMeaningContentBlock song_info={song_info} /> */}
                                      
                                        
                                      </div> 
                                    ) : (
                                      <div className='container flex items-center justify-center mt-10'>
                                        <Card className="mb-0.5 flex-1  bg-white px-4 pt-4 pb-4 sm:mb-8 sm:flex-initial rounded-md md:px-10 md:pt-9 md:pb-10 ">
                        
                                          <CardHeader className="bg-beige-200 rounded-t-lg px-6 py-4">
                                            <CardTitle className="text-xl font-bold text-gray-800">This song is invalid</CardTitle>
                                            
                                          </CardHeader>
                                    
                                          <CardContent className="p-6 text-gray-700">
                                            <p>This song does not have valid Lyrics.</p>
                                          </CardContent>
                                    
                                          
                                          
                                        </Card>
                                      </div>
                                    )
                                  }
                                                                                
                                
                              </CardContent>
                            </div>
                            <div className='w-screen sm:w-full text-sm lg:w-2/3 mb-10'>
                              {
                                is_meaning_valid ? (
                                  <>
                                    {/* <LikeAndShareContainer song_title={song_data.song_title} song_art_url={song_data.header_image_url!} song_slug={song_data.song_slug} /> */}
                                    <ShareContainer song_data={song_data} song_art_url={song_data.header_image_url!}  song_slug={song_data.song_slug} song_title={song_data.song_title}/>
                                  </>
                                ) : (
                                  <></>
                                )
                              } 
                              
                            </div>
                        
                            
                            
                            <div className='  flex text-black flex-col lg:flex-row lg:items-start items-center  '>

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
                  
                
                
              </div>
              
              <FooterContainer />
            </main>

          );

        }