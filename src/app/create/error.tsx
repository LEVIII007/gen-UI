'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Something went wrong!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <Button onClick={reset} variant="outline" className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  )
} 