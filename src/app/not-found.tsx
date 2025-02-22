import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <FileQuestion className="h-16 w-16 text-gray-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <h2 className="text-xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="mt-4">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  )
} 