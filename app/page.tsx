import { Header } from "@/components/header"
import { ZillowInspiredHero } from "@/components/zillow-inspired-hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ZillowInspiredHero />
      <FeaturedProperties />
      <Footer />
    </div>
  )
}
