import HomeButton from "./components/HomeButton";
import SearchInput from "./components/SearchInput";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomeButton />
      <SearchInput />
      <footer className="text-gray-500 text-sm mt-32">
            Copyright {new Date().getFullYear()}
      </footer>
    </main>
  );
}
