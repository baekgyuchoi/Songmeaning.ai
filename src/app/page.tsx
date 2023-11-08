import HomeButton from "./components/HomeButton";
import SearchInput from "./components/SearchInput";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HomeButton />
      <SearchInput />
      <h1> copyright </h1>
    </main>
  );
}
