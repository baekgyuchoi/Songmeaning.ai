import HomeButton from "./HomeButton";
import SearchInput from "./(search-page)/SearchInput";

const NavBar = () => {
    // NavBar.js

return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="ml-20">
          <HomeButton />
        </div>
        
  
        <SearchInput />
  
      </div>
    </div>
  )
}

export default NavBar;