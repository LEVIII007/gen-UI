import { Camera, Code2, Wand2 } from "lucide-react"

const features = [
  {
    name: 'Screenshot Analysis',
    description: 'Upload any webpage screenshot and our AI will analyze its structure, layout, and design patterns.',
    icon: Camera,
  },
  {
    name: 'Structured Prompts',
    description: 'Get detailed, structured prompts that break down the page into layout, theme, and content components.',
    icon: Code2,
  },
  {
    name: 'AI-Ready Output',
    description: 'Generated prompts are optimized for Cursor AI and Windsurf AI, ensuring accurate code recreation.',
    icon: Wand2,
  },
]

export default function Features() {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to generate accurate code
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 