export default function CircularProgress({ progress, size = 76, strokeWidth = 7 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-gray-200" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="text-orange-500 transition-all duration-1000 ease-in-out" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-lg font-bold tracking-tight text-gray-900">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
