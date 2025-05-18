import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b border-primary/20 shadow-lg shadow-primary/10 bg-background/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-8 w-auto transition-all duration-300 ease-out group-hover:scale-105 filter group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.7)]" />
        </Link>
        <div className="flex items-center gap-3 text-accent">
          <ShieldCheck size={22} className="transition-all duration-300 ease-out group-hover:text-primary filter drop-shadow-[0_0_3px_hsl(var(--accent)/0.6)]" />
          <span className="font-semibold hidden sm:inline transition-colors duration-300 ease-out group-hover:text-primary-foreground text-glow-accent">Automation Dashboard</span>
        </div>
      </div>
    </header>
  );
}
