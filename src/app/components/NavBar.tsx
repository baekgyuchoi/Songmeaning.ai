import HomeButton from "./HomeButton";
import SearchInput from "./(search-page)/SearchInput";

const NavBar = () => {
    // NavBar.js

return (
    <div className="">
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between p-4 ">
        <div className="ml-0 md:ml-20">
          <HomeButton />
        </div>
        
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full md:w-1/2">
            <SearchInput />
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default NavBar;