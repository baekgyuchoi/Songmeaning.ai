
import TypewriterComponent from "typewriter-effect";
import HomeButton from "./components/HomeButton";
import SearchInput from "./components/SearchInput";
import HomeTypewriter from "./components/HomeTypewriter";
import { PrismaClient } from "@prisma/client";
import SearchItemButton from "./components/(search-page)/SearchItemButton";
import TrendingSongs from "./components/TrendingSongs";



export default async function Home() {

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-36">
        <div className="mt-16 ">
          <HomeButton />
        </div>
        <HomeTypewriter />
        <SearchInput />
        <div className="w-full md:w-4/5 flex flex-col items-center jusify-center ">
          
          <TrendingSongs className="w-full" />
        </div>
        
      </main>
      <div className="flex flex-col items-center justify-between pb-36 pt-36">
          <footer>Copyright</footer>
      </div>
      
    </div>
  );
}
