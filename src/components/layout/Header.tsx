import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 border-b border-primary/20 shadow-md shadow-primary/10">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2 text-primary">
          <ShieldCheck size={24} />
          <span className="font-semibold hidden sm:inline">Automation Dashboard</span>
        </div>
      </div>
    </header>
  );
}
