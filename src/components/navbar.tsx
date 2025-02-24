import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="GenUI Logo" 
              width={32} 
              height={32}
              className="h-8 w-8"
            />
            <span className="font-bold">GenUI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link href="/create" className="hover:text-foreground/80">
              Create
            </Link>
            <Link href="/dashboard" className="hover:text-foreground/80">
              Dashboard
            </Link>
          </nav>
          <Button variant="outline">Sign In</Button>
        </div>
      </div>
    </nav>
  )
}
