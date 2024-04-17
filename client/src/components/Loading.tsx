export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2 -ml-4">
      <div role="status">
        <svg
          className="w-8 md:w-16 h-8 md:h-16 text-gray-200 animate-spin dark:text-blue-300 fill-red-500"
          stroke="#FC4747"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dasharray"
                dur="1.5s"
                calcMode="spline"
                values="0 150;42 150;42 150;42 150"
                keyTimes="0;0.475;0.95;1"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                dur="1.5s"
                calcMode="spline"
                values="0;-16;-59;-59"
                keyTimes="0;0.475;0.95;1"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              dur="2s"
              values="0 12 12;360 12 12"
              repeatCount="indefinite"
            />
          </g>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
