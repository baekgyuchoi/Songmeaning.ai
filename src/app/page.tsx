
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
      <main className="flex min-h-screen flex-col items-center justify-between p-36">
        <div className="mt-16">
          <HomeButton />
        </div>
        <HomeTypewriter />
        <SearchInput />
        <div>
          <footer className="text-gray-500 text-sm mt-32">
              © 2021 Songmeanings.ai
          </footer>
        </div>
        
      </main>
      <main className="flex min-h-screen flex-col items-center justify-between p-36">
        <TrendingSongs />
      </main>
      
    </div>
  );
}
