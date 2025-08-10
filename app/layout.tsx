// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import PerformanceMonitor from "@/src/components/PerformanceMonitor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Royal Routes Rwanda | Luxury Tours, Car Rentals & Gorilla Trekking",
  description: "Book luxury Rwanda tours with Royal Routes — expert-guided gorilla trekking, safaris in Akagera, Kigali city tours, premium car rentals, and handpicked accommodations for an unforgettable African journey.",
  keywords: "Rwanda tours, Rwanda luxury travel, gorilla trekking tours, Kigali car rental, Rwanda safari packages, Volcanoes National Park, Akagera National Park safaris, Nyungwe Forest tours, Rwanda vacation deals",
  authors: [{ name: "Royal Routes" }],
  openGraph: {
    title: "Royal Routes Rwanda | Luxury Tours, Car Rentals & Gorilla Trekking",
    description: "Luxury travel packages in Rwanda — safaris, gorilla trekking, Kigali car rentals, and premium stays. Plan your trip with Royal Routes today.",
    type: "website",
    locale: "en_US",
    url: "https://royalroutestours.com",
    siteName: "Royal Routes Rwanda",
    images: [
      {
        url: "https://royalroutestours.com/images/hero/hero1.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Routes Rwanda - Luxury Tours and Gorilla Trekking"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Routes Rwanda | Luxury Tours, Car Rentals & Gorilla Trekking",
    description: "Explore Rwanda with Royal Routes — safaris, gorilla trekking, Kigali car rentals, and premium accommodations.",
    images: ["https://royalroutestours.com/images/hero/hero1.jpg"]
  },
  robots: "index, follow",
}

export const viewport = "width=device-width, initial-scale=1"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <PerformanceMonitor />
        </ThemeProvider>
      </body>
    </html>
  )
}
