interface FlightBriefLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function FlightBriefLogo({ className = "", size = "md" }: FlightBriefLogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pencil Body */}
      <g transform="rotate(45 50 50)">
        {/* Main pencil shaft */}
        <rect 
          x="46" 
          y="20" 
          width="8" 
          height="50" 
          fill="currentColor"
          rx="1"
        />
        
        {/* Pencil tip */}
        <polygon 
          points="46,70 54,70 50,78" 
          fill="currentColor"
        />
        
        {/* Pencil eraser ferrule */}
        <rect 
          x="45" 
          y="15" 
          width="10" 
          height="8" 
          fill="currentColor"
          rx="1"
        />
        
        {/* Pencil eraser */}
        <ellipse 
          cx="50" 
          cy="12" 
          rx="4" 
          ry="3" 
          fill="currentColor"
          opacity="0.8"
        />
      </g>
      
      {/* Airplane Wings - Swept Back */}
      <g transform="rotate(45 50 50)">
        {/* Left wing - swept back */}
        <path 
          d="M 46 45 L 25 40 L 20 42 L 25 47 L 46 47 Z" 
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Right wing - swept back */}
        <path 
          d="M 54 45 L 75 40 L 80 42 L 75 47 L 54 47 Z" 
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Wing tips - left */}
        <path 
          d="M 20 42 L 18 41 L 22 46 L 25 47 Z" 
          fill="currentColor"
          opacity="0.7"
        />
        
        {/* Wing tips - right */}
        <path 
          d="M 80 42 L 82 41 L 78 46 L 75 47 Z" 
          fill="currentColor"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}
