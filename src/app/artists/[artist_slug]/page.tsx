
import ArtistTopSongCarousel from "@/app/components/(artist-page)/ArtistTopSongCarousel";
import ArtistTotalSongs from "@/app/components/(artist-page)/ArtistTotalSongs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Artist } from "@/lib/validators/artist";
import prisma from "@/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import FooterContainer from "@/app/components/(footer)/FooterContainer";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {artist_slug: string};
}): Promise<Metadata> {
  const artist_slug  = params.artist_slug;
  // read route params
  const artist_db = await prisma.artist.findUnique({
    where: {
      artist_slug: artist_slug
    },
  
  })

  const songs_by_artist = await prisma.songs.findMany({
    where: {
      artist_slug: artist_slug
    },
    take: 10,
    orderBy: {
      viewCount: 'desc'
    }
  })

  // fetch data
 

  return {
    metadataBase: new URL('https://songmeaning.ai/artists/'+artist_slug),
    title: `Song Meanings for ${artist_db?.name}`,
    description: `Meanings for songs: ${songs_by_artist.map((song) => song.song_short_title).join(', ')}`,
    alternates:{
      canonical: '/'
    }
  };
}

async function GetArtistFromGenius(artist_id: number) {
  const response = await fetch('https://api.genius.com/artists/'+ artist_id, {
      headers: {
          'Authorization': 'Bearer ' + process.env.GENIUS_API_KEY_1
      },
  });
  const data = await response.json();

  return data

}



async function getArtistInfo(artist_slug: string) {
  const artist = await prisma.artist.findUnique({
    where: {
      artist_slug: artist_slug
    }
  })
  return artist
}


async function PostArtist(artist: Artist) {

  // query if song_id exists in database or use song_slug instead
  // if song exists, return "song already exists"
  // if song does not exist, create song in database
  const artist_in_db = await prisma.artist.findUnique({
      where: {
          artist_slug: artist.artist_slug,
          },
      })
  if (artist_in_db != null) {
      
      return "error: artist already exists"
  }

  
  await prisma.artist.create({
      data: {
          artist_slug: artist.artist_slug,
          name: artist.name,
          genius_id: artist.genius_id,
      }
  })
  return "Success"

}




export default async function ArtistPage({ 
    params,
    searchParams
 }: {
    params: { artist_slug : string }, 
    searchParams?: { [key: string]: string | undefined};
    }) {
        let page_number = 1;
        
        if (searchParams?.page != null) {
          page_number = parseInt(searchParams?.page)
        }

        
        // const songInfoArray = await QueueSong(params.artist_slug)
        let artist = await getArtistInfo(params.artist_slug)

        if (artist == null) {
          const artist_from_genius = await GetArtistFromGenius(parseInt(searchParams?.artist!))
          if (artist_from_genius == null) {
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
                        
                      </div>
                      
                    </div>
                  
                
                    
                  </div>
                </Card>
              </div>
              
          
              
              <footer className="text-gray-500 text-sm">2023 Songmeaning.AI</footer>
           
              </main>
                )
            }
          const new_artist: Artist = {
            genius_id: artist_from_genius.response.artist.id,
            name: artist_from_genius.response.artist.name,
            artist_slug: artist_from_genius.response.artist.url.split('/').pop(),
          }
          await PostArtist(new_artist)
          artist = {
            genius_id: artist_from_genius.response.artist.id,
            name: artist_from_genius.response.artist.name,
            artist_slug: artist_from_genius.response.artist.url.split('/').pop(),
          }


        }



       

        if (artist == null) {
            return(
              <main>
                <div className="flex flex-col items-center px-4 py-8">

                  
                  
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
                            
                          </div>
                          
                        </div>
                      
                    
                        
                      </div>
                    </Card>
                  </div>
                </div>  
            
            
            <FooterContainer />
          
          </main>
            )
        }

        const artist_name = artist.name


      
    
        return (
            <main>
              <div className="flex flex-col items-center md:px-4 py-8">
                <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 '>
                  <Card className=" w-full  mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
              
                    <div className='md:ml-12 ml-0'>
                      <CardHeader>
                        <CardTitle className="mt-12 text-4xl font-bold text-gray-800 ">
                        
                              Song meanings for <p className="text-gray-600">{artist_name}</p>
                          
                        </CardTitle>
                        
                        
                      </CardHeader>
                    
                      <div className='flex flex-col pt-12 '> 
                        <div className=" ">
                        <CardContent className="p-6 text-black flex flex-col items-center justify-center pt-6 md:pt-6" >
                          <div className="w-full flex items-center flex-col justify-center mb-8">
                            <div className='font-mono rounded-md border w-full flex items-center justify-center'>
                                <h1>Top Song Meanings by {artist.name}</h1>
                            </div>
                
                            <Suspense 
                              fallback={
                                <div className="flex items-center justify-center">
                                  <Loader2 size={32} className="animate-spin" />
                                </div>
                              }
                            >
                              <ArtistTopSongCarousel artist_slug={artist.artist_slug} className="w-full bg black"/>
                            </Suspense>
                          </div>
                          <div>
                            <div className='font-mono rounded-md border w-full flex items-center justify-center mt-20 mb-8'>
                                <h1>All Songs related to {artist.name}</h1>
                            </div>
                            <Suspense fallback={<div>loading</div>}>
                              <ArtistTotalSongs artist_id={artist.genius_id} artist_slug={artist.artist_slug} artist_name={artist.name} page={page_number} />
                            </Suspense>
                          </div>
                          
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