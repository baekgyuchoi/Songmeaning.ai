
import TypewriterComponent from "typewriter-effect";
import HomeButton from "./components/HomeButton";
import SearchInput from "./components/(search-page)/SearchInput";
import HomeTypewriter from "./components/(home-components)/HomeTypewriter";
import { PrismaClient } from "@prisma/client";
import SearchItemButton from "./components/(search-page)/SearchItemButton";
import TrendingSongs from "./components/TrendingSongs";
import HomeSearchInput from "./components/(home-components)/HomeSearchInput";
import { Card } from "@/components/ui/card";



export default async function Home() {

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-36">
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2 flex w-full flex-1 flex-col pl-0 pr-0 items-center'>
          <div className="flex items-center flex-col container w-full md:w-3/5 pb-16  " >
            
            <div className="mt-20 mb-12">
              <HomeButton />
            </div>
            <HomeTypewriter />
          </div>
          <HomeSearchInput />
          <div className="w-full md:w-full flex flex-col items-center jusify-center ">
            
            <TrendingSongs className="w-full" />
          </div>
        </div>
      </main>
      <div className="flex flex-col items-center justify-between pb-36 pt-36">
          <footer>Copyright</footer>
      </div>
    
    </div>
  );
}
