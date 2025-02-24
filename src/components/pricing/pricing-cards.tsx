'use client'

import { useState } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

const CREDIT_PRICE = 0.2 // $0.2 per credit

const FEATURES = [
  {
    name: 'Page Structure Analysis',
    starter: true,
    custom: true,
    description: 'Analyze the structure of any webpage or UI design'
  },
  {
    name: 'Theme Generation',
    starter: true,
    custom: true,
    description: 'Generate color schemes and design tokens'
  },
  {
    name: 'Component Analysis',
    starter: true,
    custom: true,
    description: 'Break down complex UIs into reusable components'
  },
  {
    name: 'Custom Credit Amount',
    starter: false,
    custom: true,
    description: 'Choose your own credit amount from 5 to 200'
  },
  {
    name: 'Priority Support',
    starter: false,
    custom: true,
    description: 'Get faster responses to your support queries'
  }
]

export function PricingCards() {
  const [credits, setCredits] = useState(50)

  const handleSliderChange = (value: number[]) => {
    setCredits(value[0])
  }

  const adjustCredits = (amount: number) => {
    const newValue = Math.min(Math.max(credits + amount, 5), 200)
    setCredits(newValue)
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Fixed Plan Card */}
        <div className="relative w-full bg-[#000000] rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-20" 
            style={{ background: 'linear-gradient(135deg, rgb(0, 0, 0) 50%, rgb(14, 165, 233) 100%)' }} 
          />
          <div className="p-8 relative z-10">
            <div className="w-12 h-12 mb-4 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-[#233997] via-[#9333ea] to-[#2fbcf8] rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
                  <line x1="7" y1="8" x2="17" y2="8" stroke="white" strokeWidth="2" />
                  <line x1="7" y1="12" x2="17" y2="12" stroke="white" strokeWidth="2" />
                  <line x1="7" y1="16" x2="13" y2="16" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-3">Starter</h2>
            <p className="text-gray-400 text-center mb-6">Perfect for getting started with AI-powered UI generation.</p>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-white">$10</span>
              <span className="text-gray-400 ml-2">/one-time</span>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                <span className="text-gray-300">50 credits</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                <span className="text-gray-300">Page Structure Analysis</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                <span className="text-gray-300">Theme Generation</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                <span className="text-gray-300">Component Analysis</span>
              </div>
            </div>
            <Button className="w-full h-[60px] relative group overflow-hidden bg-transparent border-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#233997] via-[#9333ea] to-[#2fbcf8] group-hover:opacity-90 transition-opacity duration-300" />
              <span className="relative z-10 text-lg font-semibold text-white">Get Started</span>
              <div className="absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>
          </div>
        </div>

        {/* Custom Plan Card */}
        <div className="relative w-full bg-[#000000] rounded-xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-20" 
            style={{ background: 'linear-gradient(135deg, rgb(0, 0, 0) 50%, rgb(35, 57, 151) 100%)' }} 
          />
          <div className="p-8 relative z-10">
            <div className="w-12 h-12 mb-4 mx-auto">
              <div className="w-full h-full bg-gradient-to-br from-[#233997] via-[#9333ea] to-[#2fbcf8] rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-3">Custom</h2>
            <p className="text-gray-400 text-center mb-6">Choose your own credit amount for your specific needs.</p>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-white">${(credits * CREDIT_PRICE).toFixed(2)}</span>
              <span className="text-gray-400 ml-2">/one-time</span>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => adjustCredits(-5)}
                  className={cn(
                    "rounded-full",
                    credits <= 5 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={credits <= 5}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-bold text-white">{credits} credits</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => adjustCredits(5)}
                  className={cn(
                    "rounded-full",
                    credits >= 200 && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={credits >= 200}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Slider
                value={[credits]}
                min={5}
                max={200}
                step={5}
                onValueChange={handleSliderChange}
                className="w-full"
              />

              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                  <span className="text-gray-300">Custom credit amount</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                  <span className="text-gray-300">Page Structure Analysis</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                  <span className="text-gray-300">Theme Generation</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-[#2fbcf8] mr-3" />
                  <span className="text-gray-300">Component Analysis</span>
                </div>
              </div>
            </div>

            <Button className="w-full h-[60px] relative group overflow-hidden bg-transparent border-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#233997] via-[#9333ea] to-[#2fbcf8] group-hover:opacity-90 transition-opacity duration-300" />
              <span className="relative z-10 text-lg font-semibold text-white">Get Custom Plan</span>
              <div className="absolute inset-0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="mt-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#233997] via-[#9333ea] to-[#2fbcf8]">
          Compare Features
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Column Headers */}
          <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-800">
            <div className="col-span-1">
              <h3 className="font-medium text-gray-400">Feature</h3>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-medium text-gray-400">Starter</h3>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-medium text-gray-400">Custom</h3>
            </div>
          </div>

          {/* Feature Rows */}
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.name}
              className={cn(
                "grid grid-cols-3 gap-4 p-4 rounded-lg",
                index % 2 === 0 ? "bg-black/20" : "bg-transparent"
              )}
            >
              <div className="col-span-1">
                <h3 className="font-medium text-white">{feature.name}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
              <div className="flex items-center justify-center">
                {feature.starter ? (
                  <Check className="h-5 w-5 text-[#2fbcf8]" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div className="flex items-center justify-center">
                {feature.custom ? (
                  <Check className="h-5 w-5 text-[#2fbcf8]" />
                ) : (
                  <Minus className="h-5 w-5 text-gray-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
} 