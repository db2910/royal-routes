// app/layout.tsx
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
  description:
    "Discover amazing places in Rwanda with our premium tours and transport services",

  icons: {
    icon: [
      "/favicon.ico",
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
    other: {
      url: "/safari-pinned-tab.svg",
      type: "image/svg+xml"
    }
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#001934" }
  ],

  openGraph: {
    title: "Royal Routes Tours and Transport",
    description:
      "Discover amazing places in Rwanda with our premium tours and transport services",
    url: "https://your-domain.com",
    siteName: "Royal Routes",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Royal Routes Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Royal Routes Tours and Transport",
    description:
      "Discover amazing places in Rwanda with our premium tours and transport services",
    images: ["https://your-domain.com/android-chrome-512x512.png"],
    creator: "@yourTwitterHandle"
  }
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
        <WhatsAppButton />
        <BackToTopButton />
      </body>
    </html>
  )
}
