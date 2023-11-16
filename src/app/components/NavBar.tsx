import HomeButton from "./HomeButton";
import SearchInput from "./SearchInput";

const NavBar = () => {
    return (
        <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[20] py-2">
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                <HomeButton />
                <SearchInput />
            </div>

        </div>
    )
}

export default NavBar;