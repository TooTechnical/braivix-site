import Link from "next/link";
import Logo from "./Logo";
import { NAV } from "./nav";

const POLICIES = [
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const CONTACTS = ["m.smirnova@braivix.com", "d.malone@braivix.com"];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Logo />
          <p className="muted mt-5 max-w-xs text-sm leading-relaxed">
            AI infrastructure for SME acquisition lending. The loan, the risk and the decision stay with your bank.
          </p>
        </div>

        <FooterCol title="Menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white">
              {n.label}
            </Link>
          ))}
        </FooterCol>

        <FooterCol title="Contact">
          {CONTACTS.map((c) => (
            <a key={c} href={`mailto:${c}`} className="hover:text-white">
              {c}
            </a>
          ))}
        </FooterCol>

        <FooterCol title="Policies">
          {POLICIES.map((p) => (
            <Link key={p.href} href={p.href} className="hover:text-white">
              {p.label}
            </Link>
          ))}
        </FooterCol>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-10 text-xs text-mist/40 md:px-10">© {new Date().getFullYear()} BrAIvix Ltd</div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-teal">{title}</p>
      <div className="muted mt-4 flex flex-col gap-2.5 text-sm">{children}</div>
    </div>
  );
}
