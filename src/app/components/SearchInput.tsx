"use client";

import { constants } from "buffer";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


const SearchInput = () => {
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
    <div className="flex justify-center w-2/3">
      <input
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={(event) => {if (event.key === 'Enter') {submitSearch(searchQuery)}}    }
        className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
        placeholder="Search a song here"
      />
    </div>
  );
};

export default SearchInput;