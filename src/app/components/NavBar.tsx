
import SearchInput from "./(search-page)/SearchInput";
import NavBarHomeButton from "./NavBarHomeButton";

const NavBar = () => {
    // NavBar.js

return (
    <div className="">
      <div className="  flex flex-col sm:flex-row items-center justify-center md:justify-between p-4 ">
        <div className="w-2/3 md:w-1/2 flex text-sm items-center justify-center ">
          <NavBarHomeButton />
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center ">
          <div className="w-4/5 md:w-2/3 lg:w-1/2 " >
            <SearchInput />
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default NavBar;