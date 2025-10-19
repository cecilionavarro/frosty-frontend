import { HeroSection } from "./hero-section"
import { ModeToggle } from "./mode-toggle"

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="fixed right-10 top-10 z-50">
        <ModeToggle />
      </div>

      <HeroSection />
    </div>
  )
}
