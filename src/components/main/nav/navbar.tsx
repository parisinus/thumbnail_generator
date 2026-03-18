import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">

      {/* 왼쪽 - 로고 */}
      <Image
        src="/thumbgen-logo.svg"
        alt="Thumbnail Generator Logo"
        width={240}
        height={70}
      />

      {/* 중앙 - Nav Links */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* 오른쪽 - Get Started 버튼 */}
      <Link href="/auth" className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md shadow-blue-200">
        Get Started
      </Link>

    </nav>
  );
}
