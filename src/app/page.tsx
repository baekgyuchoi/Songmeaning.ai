
import HomeButton from "./components/HomeButton";
import HomeTypewriter from "./components/(home-components)/HomeTypewriter";

import TrendingSongs from "./components/TrendingSongs";
import HomeSearchInput from "./components/(home-components)/HomeSearchInput";
import FooterContainer from "./components/(footer)/FooterContainer";
import { Badge } from "@/components/ui/badge";







export default async function Home() {

  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center justify-between p-4 pt-16 pb-16 lg:pt-0 lg:pb-0 lg:p-8">
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-5 sm:mt-20 mb-0 flex w-full flex-1 flex-col pl-0 pr-0 items-center'>
          <div className="flex items-center flex-col container w-full md:w-3/5 pb-16  " >
            
            <div className="mt-8 mb-12">
              <HomeButton />
            </div>
            <div className="flex items-center justify-center">
              <HomeTypewriter />
            </div>
          </div>
          <div className=" w-full md:w-4/5  flex justify-center">
            <HomeSearchInput />
          </div>
          <div className="w-full md:w-full flex flex-col items-center jusify-center mt-8 mb-20 ">
            
            <TrendingSongs className="w-full" />
          </div>
          <div className="w-full max-w-2xl sm:px-4 mb-20 font-mono">
            
            <div className="text-2xl font-mono text-center text-gray-500 mb-8"> <Badge className="text-2xl bg-purple-800">Beta</Badge> Updates</div>
            
            <div className="mt-4 p-4 sm:p-8 bg-white border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-700">January 10, 2023</h3>
              
              <ul className="mt-2 text-gray-600 list-disc list-inside px-5 mb-4">
                <li className="mb-1">We learned you prefer faster loading speed, so quick song meaning now loads instantly - world’s great song meaning loads in background, and, once loaded, replaces quick song meaning  </li> 
              </ul>
              <h3 className="text-lg font-medium text-gray-700">December 30, 2023</h3>
              
              <ul className="mt-2 text-gray-600 list-disc list-inside px-5 mb-4">
                <li className="mb-1">Huge breakthrough in increasing proprietary data and training the AI resulting in FAR better song meaning; however, loading time is increased to ~50 seconds</li> 
                <li className="mb-1">Song page UI redesign: added song images, release date, and background to title section</li>
              </ul>
            </div>

          </div>
          
        </div>
        
      </main>
      
      <FooterContainer />
    </div>
  );
}
