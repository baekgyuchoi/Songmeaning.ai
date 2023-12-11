import NavBar from "@/app/components/NavBar"
import { Viewport } from 'next'

export const metadata = {
    title: `...`,
    description: `...`
  }

export const viewport: Viewport = {
  maximumScale: 1,
}

  
  export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className=" overflow-hidden">
          <NavBar />
          <div className="">
            {children}
          </div>
      </div>
    )
  }