"use client";

import { SongInfo } from "@/lib/validators/song_info";
import { constants } from "buffer";
import { Song } from "genius-lyrics";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import TypewriterComponent from "typewriter-effect"
import { set } from "zod";
import SearchItemButton from "../(search-page)/SearchItemButton";
import PreviewSearchItemButton from "../(search-page)/PreviewSearchItemButton";


const HomeSearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();
  const [songInfoArray, setSongInfoArray] = useState<SongInfo[] | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
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
  console.log(data.songInfoArray)
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
          onBlur={() => setIsFocused(false)}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {if (event.key === 'Enter') {submitSearch(searchQuery)}}    }
          className="px-5 py-2 sm:px-5 sm:py-3 font-mono w-full flex-1 border-gray-300 text-black  hover:bg-gray-200 focus:bg-gray-200 rounded-full placeholder:text-base"
          placeholder="Search a song with artist name"
        />
        {searchQuery === null ||searchQuery?.length === 0||!isFocused? (
          <div className="bg-transparent"></div>
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
  );
};

export default HomeSearchInput;