import { NextAuthProvider } from '@/app/providers'
import type { Metadata } from 'next'
import { openSans } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: "Where's my BRO ?",
  description: 'Generated by create next app',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
