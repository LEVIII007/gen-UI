'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  onChange?: (files: File[]) => void
  className?: string
}

export function FileUpload({ onChange, className }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onChange) {
        onChange(acceptedFiles)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    multiple: false
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'w-full h-full flex flex-col items-center justify-center cursor-pointer',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <p className="text-lg md:text-xl text-white mb-4">
          {isDragActive
            ? "Drop the screenshot here"
            : "Drag & drop images of websites, Figma designs, or UI mockups here"}
        </p>
        <p className="text-base md:text-lg text-white/70 mb-4">or</p>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 mt-2 bg-black hover:bg-black/90 text-white"
        >
          Choose image
        </button>
        <p className="text-sm text-white/50 mt-4">
          Note: Only one image can be uploaded at a time.
        </p>
      </div>
    </div>
  )
}
