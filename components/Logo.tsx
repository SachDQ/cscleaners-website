import Image from "next/image";

export function LogoMark({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo-512.png"
      alt="Central Sea Cleaning"
      width={size}
      height={size}
      className={className}
      priority
    />
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
