interface SenglarLogoProps {
  className?: string;
}

export default function SenglarLogo({ className = "w-10 h-10" }: SenglarLogoProps) {
  return (
    <svg
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Senglars de Bardissa logo"
      role="img"
    >
      {/* Main head body */}
      <ellipse
        cx="52" cy="40" rx="28" ry="26"
        fill="white" fillOpacity="0.08"
        stroke="white" strokeWidth="2.5"
      />

      {/* Ear — pointed, top right */}
      <path
        d="M 62,15 L 68,3 L 76,17"
        stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round"
      />

      {/* Snout — extending left */}
      <ellipse
        cx="18" cy="42" rx="10" ry="8"
        fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2"
      />
      <circle cx="15" cy="40" r="2" fill="#0f172a" fillOpacity="0.5" />
      <circle cx="21" cy="40" r="2" fill="#0f172a" fillOpacity="0.5" />

      {/* Eye */}
      <circle cx="58" cy="32" r="4.5" fill="white" />
      <circle cx="59" cy="31" r="1.8" fill="#0f172a" />

      {/* Tusk — amber, curving down */}
      <path
        d="M 22,50 C 18,58 16,67 24,68"
        stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round"
      />

      {/* Bristles along the back */}
      <path
        d="M 36,14 C 42,8 52,6 62,11"
        stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"
        strokeDasharray="2 3"
      />

      {/* Bramble branches — amber, right side */}
      <path d="M 86,18 L 98,13" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,15 L 90,6"  stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />

      <path d="M 86,38 L 99,36" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,37 L 91,28" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />

      <path d="M 86,58 L 98,61" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 92,59 L 91,68" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
