import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import WhatsAppButton from "@/src/components/WhatsAppButton"
import BackToTopButton from "@/src/components/BackToTopButton"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-arizona",
})

export const metadata: Metadata = {
  title: "Royal Routes Tours and Transport",
  description: "Discover amazing places in Rwanda with our premium tours and transport services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${playfair.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* Floating Action Buttons */}
        <WhatsAppButton />
        <BackToTopButton />
      </body>
    </html>
  )
}
