export default function DotPattern() {
  return (
    <svg
      className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100 percent 100 percent at top right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dot-pattern"
          width={20}
          height={20}
          x={50}
          y={50}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={2} cy={2} r={1} className="fill-slate-300" />
        </pattern>
      </defs>
      <rect width="100 percent" height="100 percent" strokeWidth={0} fill="url(#dot-pattern)" />
    </svg>
  );
}
