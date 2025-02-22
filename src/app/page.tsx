import Hero from "@/components/landing-page/Hero"
import Features from "@/components/landing-page/Features"
import Pricing from "@/components/landing-page/Pricing"
import Footer from "@/components/landing-page/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
