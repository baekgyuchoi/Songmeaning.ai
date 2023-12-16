import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Chat from './components/(chat-components)/Chat'
import Providers from './components/(chat-components)/Providers'
import { NextUIProviderWrapper } from './components/NextUIProviderWrapper'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Songmeaning.ai',
  description: 'Meaningful stories behind songs - interpretted by ai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <Providers>
        <body className={inter.className}>
        <NextUIProviderWrapper>
          {children}
        </NextUIProviderWrapper>
        <Analytics />
        </body>
      </Providers>
      
    </html>
  )
}
