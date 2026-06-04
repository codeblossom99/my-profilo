import Link from "next/link";

export default function Home() {
  const navItems = [
    { href: "/works", label: "Works" },
    { href: "/blog", label: "Blog" },
    { href: "/life", label: "Life" },
    { href: "/contact", label: "Contact" },
  ];

  const strengths = [
    "Frontend architecture",
    "Interactive UI",
    "Design systems",
    "Product thinking",
  ];

  return (
    <main className="min-h-screen bg-[#0f1115] text-[#f4f0e8]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="font-mono text-sm uppercase tracking-[0.22em] text-[#8ee3c3]">
            TING-EN CHEN
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[#c9c3b8] sm:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#f4f0e8]">
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.28em] text-[#8ee3c3]">
              Frontend Engineer
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-balance sm:text-6xl lg:text-7xl">
              Building thoughtful web experiences with clear systems.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#c9c3b8]">
              I design and build interfaces that feel sharp, usable, and alive.
              This portfolio is where my projects, notes, and experiments will grow.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/works"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#f4f0e8] px-6 text-sm font-semibold text-[#0f1115] transition hover:bg-[#8ee3c3]"
              >
                View Works
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-semibold text-[#f4f0e8] transition hover:border-[#8ee3c3] hover:text-[#8ee3c3]"
              >
                Contact Me
              </Link>
            </div>
          </div>

          <aside className="border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
            <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8ee3c3]">
                Profile
              </span>
              <span className="text-xs text-[#c9c3b8]">2026</span>
            </div>

            <div className="space-y-4">
              {strengths.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0"
                >
                  <span className="text-sm text-[#f4f0e8]">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-[#8ee3c3]" />
                </div>
              ))}
            </div>
          </aside>
        </section>

        <footer className="grid gap-3 border-t border-white/10 py-5 text-sm text-[#8f887d] sm:grid-cols-2">
          <p>Portfolio in progress. Built with Next.js and TypeScript.</p>
          <nav className="flex gap-4 sm:justify-end">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-[#f4f0e8]">
                {item.label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
