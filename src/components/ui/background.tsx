export const Background = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 1080"
      className="fixed inset-0 -z-50 h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <filter
          id="noise"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="4"
            seed="15"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence"
          ></feTurbulence>
          <feSpecularLighting
            surfaceScale="15"
            specularConstant="1"
            specularExponent="1"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="turbulence"
            result="specularLighting"
          >
            <feDistantLight azimuth="3" elevation="100"></feDistantLight>
          </feSpecularLighting>
        </filter>
        <filter
          id="blur"
          x="0"
          y="0"
          width="100%"
          height="100%"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0.1" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="200"
            result="effect1_foregroundBlur_49_400"
          />
        </filter>
      </defs>

      <g filter="url(#blur)">
        <ellipse cx="1000" cy="300" rx="300" ry="300" fill="#40BAFF" />
        <ellipse cx="700" cy="400" rx="300" ry="300" fill="#FFA4FB" />
        <ellipse cx="500" cy="600" rx="200" ry="200" fill="#AD7FF9" />
      </g>

      <rect
        width="100%"
        height="100%"
        fill="transparent"
        filter="url(#noise)"
        className="opacity-50 bg-blend-overlay dark:opacity-5"
      ></rect>

      <pattern
        id="pattern-circles"
        x="0"
        y="0"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        <circle
          id="pattern-circle"
          cx="5"
          cy="5"
          r="1"
          className="fill-slate-300 dark:fill-black/10"
        ></circle>
      </pattern>

      <rect
        id="rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern-circles)"
        opacity="0.5"
      ></rect>
    </svg>
  );
};
