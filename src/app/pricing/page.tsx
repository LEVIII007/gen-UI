import { PricingCards } from '@/components/pricing/pricing-cards'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#233997] via-[#9333ea] to-[#2fbcf8] mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
        </div>
        <PricingCards />
      </div>
    </div>
  )
} 