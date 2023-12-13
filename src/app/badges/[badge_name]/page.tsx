import BadgeContent from "@/app/components/(badge-page)/BadgeContent";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import prisma from "@/lib/db";
import { Suspense } from "react";

async function IsBadgeInDB(badge_name: string) {
    const badge = await prisma.badges.findUnique({
        where: {
            badge_name: badge_name
        }
    })
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

                           
                        </div>
                  </Card>
                </div>):(
                    <div>
                        ERROR
                    </div>
                )}
                
                
            
            <div className="flex items-center justify-center mt-20">
                <footer className="text-gray-500 text-sm">2023 Songmeaning.AI</footer>
            </div>
          </main>

        );
    }