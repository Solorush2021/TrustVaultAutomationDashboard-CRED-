import type { SVGProps } from 'react';
import { cn } from '@/lib/utils';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="37.5" // Adjusted height to maintain aspect ratio for 150px width
      aria-label="TrustVault Logo"
      {...props}
      className={cn("overflow-visible", props.className)} // Ensure overflow is visible for glow
    >
      <defs>
        <linearGradient id="neonLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
        </linearGradient>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { filter: drop-shadow(0 0 3px hsl(var(--accent))) drop-shadow(0 0 6px hsl(var(--accent) / 0.7)); opacity: 0.9; }
            50% { filter: drop-shadow(0 0 5px hsl(var(--accent))) drop-shadow(0 0 10px hsl(var(--accent) / 0.7)) drop-shadow(0 0 15px hsl(var(--accent) / 0.5)); opacity: 1; }
          }
          .pulsing-logo-text {
            animation: pulseGlow 3s infinite ease-in-out;
          }
        `}
      </style>
      <text
        x="10"
        y="35"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="url(#neonLogoGradient)"
        letterSpacing="1"
        className="pulsing-logo-text"
        // filter="url(#neonGlow)" // SVG filter can be less performant, CSS drop-shadow used in animation
      >
        TrustVault
      </text>
    </svg>
  );
}
