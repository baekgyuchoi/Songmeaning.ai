import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './components/(chat-components)/Providers'
import { NextUIProviderWrapper } from './components/NextUIProviderWrapper'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })



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
        <SpeedInsights />
        </body>
      </Providers>
      
    </html>
  )
}
