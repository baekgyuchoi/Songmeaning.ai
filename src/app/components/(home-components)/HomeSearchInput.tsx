"use client";

import { SongInfo } from "@/lib/validators/song_info";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PreviewSearchItemButton from "../(search-page)/PreviewSearchItemButton";


const HomeSearchInput = () => {
  const search = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : '',
  );
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();
  const [songInfoArray, setSongInfoArray] = useState<SongInfo[] | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isMouseOnPreview, setIsMouseOnPreview] = useState<boolean>(false);
  const submitSearch = (searchQuery: string | null) => {
      if (typeof searchQuery !== "string") {
          return
      }
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
    <div className="flex justify-center w-full md:w-3/5  rounded p-2 transition ">
      <div className="relative w-full">
        <input
          value={searchQuery || ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {if (!isMouseOnPreview){setIsFocused(false)}}}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {if (event.key === 'Enter') {submitSearch(searchQuery)}}    }
          className="px-5 py-2 sm:px-5 sm:py-3 font-mono w-full flex-1 border-gray-300 text-black  hover:bg-gray-200 focus:bg-gray-200 rounded-full placeholder:text-base"
          placeholder="Search a song with artist name"
        />
        <div 
          className="bg-transparent z-index-100" 
          onMouseDown={(e) => e.preventDefault()}
        >
          {searchQuery === null ||searchQuery?.length === 0||!isFocused? (
            <></>
          ):(
            <div className=" absolute mt-1 w-full p-2   max-h-96 overflow-y-auto  "
            >
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

export default HomeSearchInput;