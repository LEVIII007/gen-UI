// import { motion } from 'framer-motion'
// import { Copy } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { toast } from 'sonner'

// interface PromptOutputProps {
//   data: {
//     structurePrompt?: string
//     themePrompt?: string
//     purposePrompt?: string
//     isLoading?: boolean
//   }
// }

// const copyToClipboard = async (text: string) => {
//   try {
//     await navigator.clipboard.writeText(text)
//     toast.success('Copied to clipboard!')
//   } catch (err) {
//     toast.error('Failed to copy text')
//   }
// }

// const PromptSection = ({ title, content, isLoading }: { title: string; content?: string; isLoading?: boolean }) => (
//   <Card className="w-full">
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="text-sm font-medium">{title}</CardTitle>
//       {content && (
//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-8 w-8"
//           onClick={() => copyToClipboard(content)}
//         >
//           <Copy className="h-4 w-4" />
//         </Button>
//       )}
//     </CardHeader>
//     <CardContent>
//       {isLoading ? (
//         <div className="h-20 animate-pulse rounded bg-gray-200" />
//       ) : content ? (
//         <p className="text-sm text-gray-600">{content}</p>
//       ) : (
//         <p className="text-sm text-gray-400 italic">No prompt generated yet</p>
//       )}
//     </CardContent>
//   </Card>
// )

// export default function PromptOutput({ data }: PromptOutputProps) {
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   }

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   }

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="show"
//       className="mt-8 space-y-6"
//     >
//       <motion.div variants={item}>
//         <PromptSection
//           title="Structure Prompt"
//           content={data.structurePrompt}
//           isLoading={data.isLoading}
//         />
//       </motion.div>
      
//       <motion.div variants={item}>
//         <PromptSection
//           title="Theme Prompt"
//           content={data.themePrompt}
//           isLoading={data.isLoading}
//         />
//       </motion.div>
      
//       <motion.div variants={item}>
//         <PromptSection
//           title="Page Purpose"
//           content={data.purposePrompt}
//           isLoading={data.isLoading}
//         />
//       </motion.div>
//     </motion.div>
//   )
// } 