interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 24, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="512" height="512" rx="0" className="fill-foreground" />
      <svg width="800" height="800" viewBox="0 0 800 800" x="-144" y="-144">
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fontSize="384"
          fontFamily="Inter, Arial, sans-serif"
          fontWeight="bold"
          className="fill-background"
        >
          B
        </text>
      </svg>
    </svg>
  );
}
