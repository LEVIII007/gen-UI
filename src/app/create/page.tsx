'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {FileUpload} from '@/components/create/dropzone'
import PromptOutput from '@/components/create/PromptOutput'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { analyzeScreenshot, GeneratedPrompts } from '@/utils/api'

export default function Create() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [prompts, setPrompts] = useState<Partial<GeneratedPrompts>>({})

  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile)
    // Reset prompts when new file is uploaded
    setPrompts({})
    toast.success('Screenshot uploaded successfully!')
  }

  const generatePrompts = async () => {
    if (!file) return

    setIsLoading(true)
    try {
      const data = await analyzeScreenshot(file)
      setPrompts(data)
      toast.success('Prompts generated successfully!')
    } catch (error) {
      console.error('Error generating prompts:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate prompts')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Generate AI Prompts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a screenshot of any webpage and we'll generate structured prompts
            for AI code generation. Perfect for recreating designs with Cursor AI
            or Windsurf AI.
          </p>
        </div>

        <FileUpload onChange={(files) => handleUpload(files[0])} />

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={generatePrompts}
            disabled={!file || isLoading}
            className="min-w-[200px]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Generating...' : 'Generate Prompts'}
          </Button>
        </div>

        <PromptOutput
          data={{
            ...prompts,
            isLoading,
          }}
        />
      </motion.div>
    </main>
  )
} 