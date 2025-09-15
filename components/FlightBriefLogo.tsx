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
      
      {/* Airplane Wings */}
      <g transform="rotate(45 50 50)">
        {/* Left wing */}
        <ellipse 
          cx="35" 
          cy="45" 
          rx="12" 
          ry="3" 
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Right wing */}
        <ellipse 
          cx="65" 
          cy="45" 
          rx="12" 
          ry="3" 
          fill="currentColor"
          opacity="0.9"
        />
        
        {/* Wing details - left */}
        <ellipse 
          cx="30" 
          cy="45" 
          rx="3" 
          ry="1" 
          fill="currentColor"
          opacity="0.6"
        />
        
        {/* Wing details - right */}
        <ellipse 
          cx="70" 
          cy="45" 
          rx="3" 
          ry="1" 
          fill="currentColor"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
