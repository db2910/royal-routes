import Navbar from "@/src/components/Navbar"
import Footer from "@/src/components/Footer"
import WhatsAppButton from "@/src/components/WhatsAppButton"
import BackToTopButton from "@/src/components/BackToTopButton"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <BackToTopButton />
    </>
  )
} 