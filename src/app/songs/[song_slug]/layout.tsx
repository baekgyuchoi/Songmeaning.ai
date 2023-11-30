import Chat from "@/app/components/(chat-components)/Chat"
import NavBar from "@/app/components/NavBar"

export const metadata = {
    title: `...`,
    description: `...`
  }
  
  export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="w-fit min-w-540 bg-[hsl(0,0%,95%)]">
          <NavBar />
          <div className="w-fit">
            {children}
          </div>
      </div>
    )
  }