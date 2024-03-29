
import HomeButton from "./components/HomeButton";
import HomeTypewriter from "./components/(home-components)/HomeTypewriter";

import TrendingSongs from "./components/TrendingSongs";
import HomeSearchInput from "./components/(home-components)/HomeSearchInput";
import FooterContainer from "./components/(footer)/FooterContainer";
import { Badge } from "@/components/ui/badge";
import VoiceJungleBanner1 from "./components/(ads+affiliates)/VoiceJungleBanner1";
import VoiceJungleBanner2 from "./components/(ads+affiliates)/VoiceJungleBanner2";
import MusiciansFriendStupidDeal from "./components/(ads+affiliates)/MusiciansFriendStupidDeal";
import NordVPNBanner300x250 from "./components/(ads+affiliates)/NordVPNBanner300x250";
import NordVPNBanner1200x628 from "./components/(ads+affiliates)/NordVPNBanner1200x628";
import NordVPNBanner728x90 from "./components/(ads+affiliates)/NordVPNBanner728x90";








export default async function Home() {

  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center justify-between p-4 pt-16 pb-16 lg:pt-0 lg:pb-0 lg:p-8">
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-5 sm:mt-20 mb-0 flex w-full flex-1 flex-col pl-0 pr-0 items-center'>
          <div className="flex items-center flex-col container w-full md:w-3/5 pb-16  " >
            
            <div className="mt-8 mb-12">
              <HomeButton />
            </div>
            <div className="flex items-center justify-center h-24">
              <HomeTypewriter />
            </div>
          </div>
          <div className=" w-full md:w-4/5  flex justify-center">
            <HomeSearchInput />
          </div>
          <div className="w-full md:w-full flex flex-col items-center jusify-center mt-8 mb-20 ">
            
            <TrendingSongs className="w-full" />
          </div>
          {/* <div className="mb-8 sm:hidden">
            <AtlasVPNBanner2 />
          </div>
          <div className="mb-8 hidden sm:block">
            <AtlasVPNBanner1 />
          </div>
           */}
          {/* <div>
            <MusiciansFriendStupidDeal />
          </div> */}
          <div className="mb-8 hidden sm:block">
            <NordVPNBanner728x90 />
          </div>
          <div className="mb-8 sm:hidden">
            <NordVPNBanner300x250 />
          </div>
        </div>
        
      </main>
      
      <FooterContainer />
    </div>
  );
}
