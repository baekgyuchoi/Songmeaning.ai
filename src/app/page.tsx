'use client';
import TypewriterComponent from "typewriter-effect";
import HomeButton from "./components/HomeButton";
import SearchInput from "./components/SearchInput";


export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-36">
        <div className="mt-16">
          <HomeButton />
        </div>
        <div className="">
          
          <TypewriterComponent 
            options={{
              strings: ['Hello', 'Welcome to Songmeanings.ai', 'Search a song to get started'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <SearchInput />
        <div>
          <footer className="text-gray-500 text-sm mt-32">
              © 2021 Songmeanings.ai
          </footer>
        </div>
        
      </main>
      <main className="flex min-h-screen flex-col items-center justify-between p-36">
        <div className="mt-16">
          <HomeButton />
        </div>
        <div className="">
          
          <TypewriterComponent 
            options={{
              strings: ['Hello', 'Welcome to Songmeanings.ai', 'Search a song to get started'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <SearchInput />
        <footer className="text-gray-500 text-sm mt-32">
              Copyright {new Date().getFullYear()}
        </footer>
      </main>
      
    </div>
  );
}
