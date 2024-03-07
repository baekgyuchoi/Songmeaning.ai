
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUIProviderWrapper } from './components/NextUIProviderWrapper'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Songmeaning.ai",
  description: "The world’s best song meanings"
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4086941427078478"
          crossOrigin="anonymous">

        </script>
        <meta name="yandex-verification" content="bd4e28b3436e4e29" />
      </head>
      
      <body className={inter.className}>
        <NextUIProviderWrapper>
          {children}
        </NextUIProviderWrapper>
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAnalytics gaId='G-8V6D26JPJR'/>
      <GoogleTagManager gtmId='GTM-NW2ZQVKJ'/>

      
    </html>
  )
}
