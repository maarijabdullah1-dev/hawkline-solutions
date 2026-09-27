interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 44, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 46 46"
      fill="none"
      className={className}
      aria-label="Hawkline Solutions logo"
    >
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter">
        {/* N */}
        <g transform="rotate(0 23 23)">
          <path d="M23 0 V19.5" />
          <path d="M14 10.2 L23 19.2 L32 10.2" />
        </g>
        {/* E */}
        <g transform="rotate(90 23 23)">
          <path d="M23 0 V19.5" />
          <path d="M14 10.2 L23 19.2 L32 10.2" />
        </g>
        {/* S */}
        <g transform="rotate(180 23 23)">
          <path d="M23 0 V19.5" />
          <path d="M14 10.2 L23 19.2 L32 10.2" />
        </g>
        {/* W */}
        <g transform="rotate(270 23 23)">
          <path d="M23 0 V19.5" />
          <path d="M14 10.2 L23 19.2 L32 10.2" />
        </g>
      </g>
    </svg>
  );
}
