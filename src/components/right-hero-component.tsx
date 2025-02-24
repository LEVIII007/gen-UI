"use client";

import { useState, useEffect } from "react";
import { Sparkles, Copy, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/create/dropzone";
import { toast } from "sonner";
import { generateText } from "@/lib/generate";
import { ScrollArea } from "@/components/ui/scroll-area";
import image from 'next/image'
import { CopyIcon } from '@radix-ui/react-icons'

type AnalysisType = "web" | "mobile";

interface GenerateResponse {
  error?: string;
  analysis: string;
  pageStructure: string | null;
}

export default function RightHero() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isGeneratingStructure, setIsGeneratingStructure] = useState(false);
  const [pageStructure, setPageStructure] = useState<string | null>(null);
  const [promptsGenerated, setPromptsGenerated] = useState(0);
  const [analysisType, setAnalysisType] = useState<AnalysisType>("web");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedContent, setGeneratedContent] = useState<GenerateResponse>({
    analysis: null,
    pageStructure: null
  })

  const handleUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    setPreviewUrl(url);
    setAnalysis(null);
    setPageStructure(null);
    toast.success("Screenshot uploaded successfully!");
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleGenerate = async () => {
    if (!file) return;
    setIsLoading(true);
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("options", "basic");

      const response = await generateText(formData) as GenerateResponse;

      if (response.error) {
        throw new Error(response.error);
      }

      setAnalysis(response.analysis);
      setPromptsGenerated(prev => prev + 1);
      toast.success("Analysis completed!");
    } catch (error) {
      toast.error("Failed to generate analysis");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStructure = async () => {
    try {
      setLoading(true)
      setError(null)
      // TODO: Implement API call
      const response = await fetch('/api/generate-structure')
      const data = await response.json()
      
      setGeneratedContent({
        analysis: data.analysis || null,
        pageStructure: data.pageStructure || null
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="w-full space-y-12 relative">
      <div className="max-w-2xl mx-auto relative">
        <div className="text-card-foreground shadow-sm border-0 relative bg-[#212222]/80 backdrop-blur-md rounded-lg p-8 text-center transition-colors min-h-[800px] flex flex-col">
          {/* Gradient backgrounds */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#233997] to-[#2fbcf8] -z-10" />
          <div className="absolute inset-[1px] rounded-lg bg-gradient-to-r from-[#0A192F] to-[#212222]/80 backdrop-blur-md -z-10" />
          
          <div className="relative z-0 flex-grow">
            {/* Upload section */}
            <div className="flex flex-col items-center justify-center h-72 md:h-96 space-y-6 relative">
              <div className="bg-[#212222] p-6 rounded-lg w-full h-full flex flex-col items-center justify-center border border-gray-700/50">
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={previewUrl} 
                      alt="Uploaded preview" 
                      className="w-full h-full object-contain rounded-md"
                    />
                    {isLoading && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-md">
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="h-1 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute animate-scan" />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent translate-y-[-100%] animate-scan-overlay" />
                        </div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                          Analyzing image...
                        </div>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                        setAnalysis(null);
                        setPageStructure(null);
                      }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    onChange={(files) => handleUpload(files[0])}
                    className="w-full h-full flex flex-col items-center justify-center"
                  />
                )}
              </div>
            </div>

            {/* Analysis focus selector */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2 text-left text-white">
                Choose analysis focus:
              </p>
              <Select 
                defaultValue={analysisType}
                onValueChange={(value) => setAnalysisType(value as AnalysisType)}
              >
                <SelectTrigger className="flex items-center justify-between rounded-md border py-2 text-sm ring-offset-background bg-[#212222] border-gray-700/50 text-white h-[64px] px-4 focus:ring-0">
                  <SelectValue>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-white">
                        {analysisType === 'web' ? 'Web applications' : 'Mobile applications'}
                      </span>
                      <span className="text-xs text-white/50">
                        {analysisType === 'web' 
                          ? 'Analyze SaaS, UI & Figma designs.'
                          : 'Analyze mobile UI designs.'}
                      </span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">
                    <div className="flex flex-col">
                      <span className="font-semibold">Web applications</span>
                      <span className="text-xs opacity-50">Analyze SaaS, UI & Figma designs.</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mobile">
                    <div className="flex flex-col">
                      <span className="font-semibold">Mobile applications</span>
                      <span className="text-xs opacity-50">Analyze mobile UI designs.</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Generated Content Area */}
          <ScrollArea className="flex-grow mt-8 pr-4 -mr-4">
            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded">
                {error}
              </div>
            )}

            {generatedContent.analysis && (
              <div className="space-y-6">
                {/* Analysis Output */}
                <div className="bg-[#1a1a1a] rounded-lg p-6 text-left relative group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-semibold">Generated Prompt:</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(generatedContent.analysis!)}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] pr-4 -mr-4">
                    <p className="text-white/90 whitespace-pre-wrap">{generatedContent.analysis}</p>
                  </ScrollArea>
                </div>

                {/* Page Structure Generation Option */}
                {!generatedContent.pageStructure && (
                  <Button
                    onClick={handleGenerateStructure}
                    disabled={loading}
                    className="w-full py-4 bg-[#1a1a1a] hover:bg-[#1a1a1a]/80 text-white"
                  >
                    <Code2 className="mr-2 h-4 w-4" />
                    {loading ? 'Generating Structure...' : 'Generate Page Structure'}
                  </Button>
                )}

                {/* Page Structure Output */}
                {generatedContent.pageStructure && (
                  <div className="bg-[#1a1a1a] rounded-lg p-6 text-left relative group">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-semibold">Page Structure:</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(generatedContent.pageStructure!)}
                      >
                        <CopyIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <ScrollArea className="h-[200px] pr-4 -mr-4">
                      <p className="text-white/90 whitespace-pre-wrap">{generatedContent.pageStructure}</p>
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            )}
          </ScrollArea>

          <p className="text-sm text-white/70 mt-6 text-center">
            Prompts generated: {promptsGenerated} / 50
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/50">
            Found bugs that needs squashing? Report bugs here:{' '}
            <a
              href="mailto:info@copycoder.ai?subject=Bug%20report"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              info@copycoder.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
