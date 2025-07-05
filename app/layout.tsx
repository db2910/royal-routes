// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Royal Routes - Premium Travel & Tourism in Rwanda",
  description: "Discover the beauty of Rwanda with Royal Routes. Premium tours, car rentals, accommodations, and event management services.",
  keywords: "Rwanda, tourism, travel, tours, car rental, accommodation, events, gorilla trekking, safari",
  authors: [{ name: "Royal Routes" }],
  openGraph: {
    title: "Royal Routes - Premium Travel & Tourism in Rwanda",
    description: "Discover the beauty of Rwanda with Royal Routes. Premium tours, car rentals, accommodations, and event management services.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Routes - Premium Travel & Tourism in Rwanda",
    description: "Discover the beauty of Rwanda with Royal Routes. Premium tours, car rentals, accommodations, and event management services.",
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
        </ThemeProvider>
      </body>
    </html>
  )
}
