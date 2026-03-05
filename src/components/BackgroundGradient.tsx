import React from "react";

const BackgroundGradient = () => {
  return (
    <>
      {/* Gradient overlay for smooth transition from white to background */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
      />
      {/* Background SVG */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 440 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
        >
          <g filter="url(#filter0_f_346_622)">
            <circle
              cx="207.5"
              cy="207.5"
              r="207.5"
              transform="matrix(-1 0 0 1 283 593)"
              fill="url(#paint0_linear_346_622)"
            />
          </g>
          <g filter="url(#filter1_f_346_622)">
            <circle
              cx="207.5"
              cy="207.5"
              r="207.5"
              transform="matrix(-1 0 0 1 607 335)"
              fill="url(#paint1_linear_346_622)"
            />
          </g>
          <g filter="url(#filter2_df_346_622)">
            <circle
              cx="207.5"
              cy="207.5"
              r="207.5"
              transform="matrix(-1 0 0 1 220 184)"
              fill="url(#paint2_linear_346_622)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_346_622"
              x="-316"
              y="409"
              width="783"
              height="783"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="92"
                result="effect1_foregroundBlur_346_622"
              />
            </filter>
            <filter
              id="filter1_f_346_622"
              x="12"
              y="155"
              width="775"
              height="775"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="90"
                result="effect1_foregroundBlur_346_622"
              />
            </filter>
            <filter
              id="filter2_df_346_622"
              x="-379"
              y="0"
              width="783"
              height="783"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_346_622"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_346_622"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="92"
                result="effect2_foregroundBlur_346_622"
              />
            </filter>
            <linearGradient
              id="paint0_linear_346_622"
              x1="120.5"
              y1="18.5"
              x2="318.699"
              y2="415"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#764BA2" />
              <stop offset="1" stopColor="#667EEA" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_346_622"
              x1="191.5"
              y1="1.65669e-06"
              x2="366"
              y2="333"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#667EEA" />
              <stop offset="1" stopColor="#764BA2" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_346_622"
              x1="191.5"
              y1="1.65669e-06"
              x2="366"
              y2="333"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#667EEA" />
              <stop offset="1" stopColor="#764BA2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default BackgroundGradient;
