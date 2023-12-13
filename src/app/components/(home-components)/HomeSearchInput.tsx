"use client";

import { constants } from "buffer";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import TypewriterComponent from "typewriter-effect"


const HomeSearchInput = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  );
  const router = useRouter();

const submitSearch = (searchQuery: string | null) => {
    if (typeof searchQuery !== "string") {
        return
    }
    router.push(`/search?q=${searchQuery}`);
}



  return (
    <div className="flex justify-center w-full md:w-3/5  rounded p-2 transition ">
      <input
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={(event) => {if (event.key === 'Enter') {submitSearch(searchQuery)}}    }
        className="px-5 py-2 sm:px-5 sm:py-3 font-mono flex-1 border-gray-300 text-black  hover:bg-gray-200 focus:bg-gray-200 rounded-full placeholder:text-base"
        placeholder="Search a song with artist name"
      />
    </div>
  );
};

export default HomeSearchInput;