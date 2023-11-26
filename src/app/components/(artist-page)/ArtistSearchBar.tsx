'use client'

import { useState } from "react";



const SearchInput = () => {
  
  const [searchQuery, setSearchQuery] = useState<string | null>(
    ""
  );
  





  return (
    <div className="flex justify-center w-full md:w-1/3 rounded p-2 transition ">
      <input
        value={searchQuery || ""}
        onChange={(event) => setSearchQuery(event.target.value)}
        
        className="px-5 py-1 sm:px-5 sm:py-3 flex-1 border-gray-300 text-black bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 rounded-full   placeholder:text-black-400"
        placeholder="Search a song here"
      />
    </div>
  );
};

export default SearchInput;