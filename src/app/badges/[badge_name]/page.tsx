import BadgeContent from "@/app/components/(badge-page)/BadgeContent";
import BadgeStatistics from "@/app/components/(badge-page)/BadgeStatistics";
import BadgeTopSongs from "@/app/components/(badge-page)/BadgeTopSongs";
import Chat from "@/app/components/(chat-components)/Chat";
import SearchItemButton from "@/app/components/(search-page)/SearchItemButton";
import SongMeaningContent from "@/app/components/(song-page)/SongMeaningContent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SongData } from "@/lib/validators/song_data_response";
import { SongInfo } from "@/lib/validators/song_info";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";

async function IsBadgeInDB(badge_name: string) {
    const prisma = new PrismaClient()
    const badge = await prisma.badges.findUnique({
        where: {
            badge_name: badge_name
        }
    })
    await prisma.$disconnect()
    if (badge == null) {
        return false
    }else{
        return true
    }

}






export default async function BadgesPage({ params }: {
    params: { badge_name : string } 
    }) {
        const isBadgeInDB = await IsBadgeInDB(params.badge_name)


        
        return (
            
            <main className="flex flex-col items-center md:px-4 py-8">
                {isBadgeInDB ? (
                <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 '>
                  <Card className=" w-full  mb-0.5 flex-1 rounded-t-3xl from-primary to-primary/80 px-8 pt-7 pb-8 text-white shadow-xl sm:mb-8 sm:flex-initial sm:rounded-b-3xl md:px-10 md:pt-9 md:pb-10 ">
              
                        <div className="ml-8">
                            <CardHeader>
                                <CardTitle className="mt-12 text-4xl font-bold text-gray-800">
                                
                                    Badge: <Badge className="bg-gray-600 text-white text-4xl pl-4 pr-4">{params.badge_name}</Badge>
                                
                                </CardTitle>
                                
                                
                            </CardHeader>
                        
                    
                            <BadgeContent badge_name={params.badge_name} />
                    
                            <CardFooter className="bg-beige-200 rounded-b-lg px-6 mt-36 py-4">  
                                <p className="text-gray-700">Card Footer</p>
                            </CardFooter>
                        </div>
                  </Card>
                </div>):(
                    <div>
                        ERROR
                    </div>
                )}
                
                
            
            <footer className="text-gray-500 text-sm mt-32">
              Copyright {new Date().getFullYear()}
            </footer>
          </main>

        );
    }