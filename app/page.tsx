import { ProfessionalHeader } from "@/components/professional-header"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ProfessionalHeader />
      <EnhancedHeroSection />
      <FeaturedProperties />
      <Footer />
    </div>
  )
}
