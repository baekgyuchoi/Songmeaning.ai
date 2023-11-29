import HomeButton from "./HomeButton";
import SearchInput from "./(search-page)/SearchInput";

const NavBar = () => {
    // NavBar.js

return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between p-4 ">
        <div className="ml-4 md:ml-20 ">
          <HomeButton />
        </div>
        
        <div className="w-1/2 flex items-center justify-end mr-10">
          <div className="w-1/2">
            <SearchInput />
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default NavBar;