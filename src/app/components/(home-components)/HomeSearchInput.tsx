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
        className="px-5 py-1 sm:px-5 sm:py-3 flex-1 border-gray-300 text-black bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded-full   placeholder:text-black-400"
        placeholder="Search a song here"
      />
    </div>
  );
};

export default HomeSearchInput;