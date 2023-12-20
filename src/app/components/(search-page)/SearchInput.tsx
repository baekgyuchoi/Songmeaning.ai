"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PreviewSearchItemButton from "./PreviewSearchItemButton";
import { SongInfo } from "@/lib/validators/song_info";


const SearchInput = () => {
  const search = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : '',
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [songInfoArray, setSongInfoArray] = useState<SongInfo[] | null>(null);
  const router = useRouter();


const submitSearch = (searchQuery: string | null) => {
    if (typeof searchQuery !== "string") {
        return
    }
    setSearchQuery(null)
    router.push(`/search?q=${searchQuery}`);
}

const fetchData =  async () => {
  const response = await fetch(`/api/get_search_preview?q=${searchQuery}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json()
  setSongInfoArray(data.songInfoArray)
}

useEffect(() => {
    if (typeof searchQuery !== "string") {
        return
    }
    if (searchQuery.length > 0) {
        fetchData();
    }
}, [searchQuery]);



  return (
    <div className="flex flex-col justify-center w-full rounded p-2 transition ">
      <div className="relative w-full">
        <input
          value={searchQuery || ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {if (event.key === 'Enter') {submitSearch(searchQuery)}}    }
          className="w-full px-5 py-1 sm:px-5 sm:py-3 flex-1 border-gray-300 text-black bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 placeholder:text-xs md:placeholder:text-sm rounded-full justify-center placeholder:text-black-400"
          placeholder="Search a song with artist name"
        />
        <div 
          className="bg-transparent"
          onMouseDown={(e) => e.preventDefault()}
        >
          {searchQuery === null || searchQuery?.length === 0 || !isFocused? (
              <></>
            ):(
              <div className=" absolute mt-1 w-full p-2   max-h-96 overflow-y-auto">
                <ul>
                  {songInfoArray?.map((songInfo,index) => (
                    
                    <li key={index}>
                      <PreviewSearchItemButton songInfo={songInfo} key={index}/>
                    </li>
                    
                  )
                  )}
                </ul>
              </div>
            )}
        </div>
      </div>
      
    </div>
  );
};

export default SearchInput;