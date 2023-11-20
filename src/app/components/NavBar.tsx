import HomeButton from "./HomeButton";
import SearchInput from "./SearchInput";

const NavBar = () => {
    // NavBar.js

return (
    <div className="">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        <HomeButton />
  
        <SearchInput />
  
      </div>
    </div>
  )
}

export default NavBar;