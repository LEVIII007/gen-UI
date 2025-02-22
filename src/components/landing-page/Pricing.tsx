import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: 'Hobby',
    id: 'tier-hobby',
    price: { monthly: '$0' },
    description: 'Perfect for side projects and learning.',
    features: ['5 screenshots per day', 'Basic prompt generation', 'Community support'],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    price: { monthly: '$15' },
    description: 'Ideal for professional developers.',
    features: [
      'Unlimited screenshots',
      'Advanced prompt customization',
      'Priority support',
      'API access',
      'Custom templates',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: { monthly: 'Custom' },
    description: 'For teams and organizations.',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated support',
      'Team collaboration',
      'Advanced analytics',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose your plan
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.featured ? 'lg:z-10 lg:rounded-b-none' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant={tier.featured ? "default" : "outline"}
                className="mt-8 w-full"
              >
                Get started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 