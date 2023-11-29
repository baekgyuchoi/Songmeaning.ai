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
      <div className="min-h-screen">
          <NavBar />
          {children}
      </div>
    )
  }