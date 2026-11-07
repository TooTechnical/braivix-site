import Link from "next/link";

/**
 * Logo mark is a raster crop for now.
 * TODO: replace /public/logo-mark.png with the designer's original SVG from Figma.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="BrAIvix home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark.png" alt="" width={34} height={34} className="mix-blend-screen" />
      <span className="text-[1.35rem] font-normal tracking-tight text-snow">BrAIvix</span>
    </Link>
  );
}
