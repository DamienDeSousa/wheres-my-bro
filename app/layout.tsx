import type { Metadata } from 'next'
import { NextAuthProvider } from '@/app/providers'

// These styles apply to every route in the application
import './globals.css'

export const metadata: Metadata = {
  title: "Where's my BRO ?",
  description: 'Generated by create next app',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
