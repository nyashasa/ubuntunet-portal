import React from "react";

const Progress = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <div
      className={`absolute w-[90%] h-12 overflow-hidden rounded-full ${className}`}
    >
      {/* Background container with arrow shape */}
      <div className="w-full h-full bg-white relative rounded-full">
        {/* Progress bar with purple gradient and stripes */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-700 to-purple-400 overflow-hidden rounded-l-full"
          style={{ width: `${value}%` }}
        >
          {/* Diagonal stripes pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)",
            }}
          />

          {/* Torn left edge effect */}
          <div
            className="absolute left-0 top-0 w-2 h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.1) 50%, transparent 70%, transparent 100%)",
              clipPath:
                "polygon(0% 0%, 100% 20%, 0% 40%, 100% 60%, 0% 80%, 100% 100%)",
            }}
          />

          {/* Loading text */}

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-medium text-sm truncate">
              Free Wifi Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
