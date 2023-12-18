
import HomeButton from "./components/HomeButton";
import HomeTypewriter from "./components/(home-components)/HomeTypewriter";

import TrendingSongs from "./components/TrendingSongs";
import HomeSearchInput from "./components/(home-components)/HomeSearchInput";
import FooterContainer from "./components/(footer)/FooterContainer";

export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'



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
          
        </div>
        
      </main>
      
      <FooterContainer />
    </div>
  );
}
