
import { Viewport } from 'next'
import NavBar from '../components/NavBar'
import '../globals.css'


export const metadata = {
  title: 'Songmeaning.ai: Meaningful stories behind songs - interpretted by ai',
  description: 'Meaningful stories behind songs - interpretted by ai'
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
    <div>
        <NavBar />
        {children}
    </div>
  )
}