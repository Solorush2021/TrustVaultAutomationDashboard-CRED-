import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b border-primary/30 shadow-md shadow-primary/20 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-auto transition-all duration-300 ease-out group-hover:scale-105" />
        </Link>
        <div className="flex items-center gap-2 text-accent">
          <ShieldCheck size={24} className="transition-all duration-300 ease-out group-hover:text-primary" />
          <span className="font-semibold hidden sm:inline transition-colors duration-300 ease-out group-hover:text-primary-foreground">Automation Dashboard</span>
        </div>
      </div>
    </header>
  );
}
