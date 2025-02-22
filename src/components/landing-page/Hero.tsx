import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transform Screenshots into AI-Powered Code
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload any webpage screenshot and get structured prompts for AI code generation. 
            Perfect for developers using Cursor AI or Windsurf AI.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/create">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">
                Get Started
              </Button>
            </Link>
            <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 