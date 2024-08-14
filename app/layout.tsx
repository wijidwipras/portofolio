import "../app/globals.css"
// import { Inter as FontSans } from "next/font/google"
import localFont from 'next/font/local'

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
// import clashDisplay from '../public/font/clashDisplay/ClashDisplay-Light.woff2'

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

const clashDisplay = localFont({
  src: [
    {
      path: '../public/font/clashDisplay/ClashDisplay-Semibold.woff2',
      weight: '600',
      style: 'semibold',
    },
  ],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          clashDisplay.className
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
