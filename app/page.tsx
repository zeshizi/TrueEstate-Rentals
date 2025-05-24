import { ZillowInspiredHeader } from "@/components/zillow-inspired-header"
import { ZillowInspiredHero } from "@/components/zillow-inspired-hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <ZillowInspiredHeader />
      <ZillowInspiredHero />
      <FeaturedProperties />
      <Footer />
    </div>
  )
}
