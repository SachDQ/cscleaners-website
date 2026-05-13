export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#023E8A" />
          <stop offset="100%" stopColor="#0077B6" />
        </linearGradient>
        <linearGradient id="lg-needle" x1="24" y1="5" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE566" />
          <stop offset="100%" stopColor="#F4A429" />
        </linearGradient>
        <radialGradient id="lg-glow" cx="50%" cy="38%" r="52%">
          <stop offset="0%" stopColor="#0096C7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#023E8A" stopOpacity="0" />
        </radialGradient>
        <clipPath id="cc">
          <circle cx="24" cy="24" r="22" />
        </clipPath>
      </defs>

      {/* Ocean background */}
      <circle cx="24" cy="24" r="23.5" fill="url(#lg-bg)" />
      <circle cx="24" cy="24" r="23.5" fill="url(#lg-glow)" />

      {/* Compass ring */}
      <circle cx="24" cy="24" r="21.5" fill="none" stroke="#90E0EF" strokeWidth="0.7" strokeOpacity="0.5" />
      {/* N tick — gold, prominent */}
      <line x1="24" y1="2.2" x2="24" y2="5.8" stroke="#FFE566" strokeWidth="1.8" strokeLinecap="round" />
      {/* S E W ticks — subtle */}
      <line x1="24" y1="42.5" x2="24" y2="45.5" stroke="#90E0EF" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="2.5"  y1="24" x2="5.5"  y2="24" stroke="#90E0EF" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.4" />
      <line x1="42.5" y1="24" x2="45.5" y2="24" stroke="#90E0EF" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.4" />

      {/*
        ── AUSTRALIA ──  geometric / schematic, exaggerated for icon legibility
        Box: x 11–33 (22 wide), y 11–26 (15 tall), centred ~(22, 18.5)

        Key features deliberately exaggerated:
          Gulf of Carpentaria  — deep rectangular notch, x=21.5–26, y=11.5–16.5
          Cape York peninsula  — pointed spike at (30, 10.5)
          NW diagonal coast    — top-left diagonal
          Great Australian Bight — gentle concave south coast
      */}
      <g clipPath="url(#cc)">
        <path
          d="
            M 11,19.5
            L 13.5,12.5
            L 21.5,11.5
            L 21.5,16.5
            L 26,16.5
            L 26,11.5
            L 27.5,11.5
            L 30,10.5
            L 31.5,12.5
            C 33,15.5 33.5,19 33,24.5
            C 31,26.5 27,26.5 22,26.5
            C 17.5,26.5 13.5,25.5 11,23
            Z
          "
          fill="white"
          fillOpacity="0.22"
          stroke="white"
          strokeWidth="0.65"
          strokeOpacity="0.55"
          strokeLinejoin="round"
        />
      </g>

      {/*
        ── PARTING SEAS ──
        All waves originate at centre (x=24) and sweep outward symmetrically.
        Three wave pairs, each wider and fainter — sea splitting apart.
      */}
      <path d="M 24,31 C 21,30 17.5,32 13,30.5"   stroke="#48CAE4" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 24,31 C 27,30 30.5,32 35,30.5"   stroke="#48CAE4" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M 24,34 C 20.5,33 16,35 11,33.5"   stroke="#90E0EF" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.65" />
      <path d="M 24,34 C 27.5,33 32,35 37,33.5"   stroke="#90E0EF" strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.65" />
      <path d="M 24,37 C 20,36 15.5,38  9.5,36.5" stroke="#90E0EF" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M 24,37 C 28,36 32.5,38 38.5,36.5" stroke="#90E0EF" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* ── COMPASS NEEDLE — gold arrow pointing north ── */}
      <line x1="24" y1="28" x2="24" y2="10.5" stroke="url(#lg-needle)" strokeWidth="2.2" strokeLinecap="round" />
      <polygon points="24,6 20.5,12 27.5,12" fill="#FFE566" />
      {/* South stub — dark blue */}
      <line x1="24" y1="28" x2="24" y2="31" stroke="#3A78C9" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      {/* Centre pivot */}
      <circle cx="24" cy="28" r="2.4" fill="#FFE566" />
      <circle cx="24" cy="28" r="1" fill="white" />
    </svg>
  );
}

export function LogoFull({
  scrolled = false,
  size = 36,
}: {
  scrolled?: boolean;
  size?: number;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span
        className="font-bold text-xl transition-colors"
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          color: scrolled ? "#1A1A2E" : "white",
        }}
      >
        Central Sea{" "}
        <span style={{ color: "#FFD166" }}>Cleaning</span>
      </span>
    </span>
  );
}
