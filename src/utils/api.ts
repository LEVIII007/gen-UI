import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface GeneratedPrompts {
  structurePrompt: string
  themePrompt: string
  purposePrompt: string
}

export const analyzeScreenshot = async (file: File): Promise<GeneratedPrompts> => {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post<GeneratedPrompts>('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to analyze screenshot')
    }
    throw error
  }
}

// Add more API functions as needed
export const endpoints = {
  analyze: '/api/analyze',
} as const 