
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
      <div>
          <NavBar />
          {children}
      </div>
    )
  }