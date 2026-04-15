import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brandGradient" x1="4" y1="2" x2="28" y2="30">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>

      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="7"
        fill="url(#brandGradient)"
      />
      <path
        d="M9 10C9 8.89543 9.89543 8 11 8H21C22.1046 8 23 8.89543 23 10V15C23 16.1046 22.1046 17 21 17H11C9.89543 17 9 16.1046 9 15V10Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M9 20C9 18.8954 9.89543 18 11 18H15C16.1046 18 17 18.8954 17 20V22C17 23.1046 16.1046 24 15 24H11C9.89543 24 9 23.1046 9 22V20Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M17.6 22.4L20.2 25L25 20.2"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
