import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 30" // Aspect ratio 5:1
      aria-label="TrustVault Logo"
      {...props} // className from header will set width/height
    >
      <text
        x="0" 
        y="15" // Vertically centered if dominant-baseline is middle
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="20" // Font size relative to viewBox units
        fontWeight="bold"
        fill="hsl(var(--primary))" 
        letterSpacing="0.5" 
        dominantBaseline="middle"
        textAnchor="start"
      >
        TrustVault
      </text>
    </svg>
  );
}
