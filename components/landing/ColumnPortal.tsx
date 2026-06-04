"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const columns = [
  {
    href: "/works",
    label: "PROJECTS",
    code: "01",
    meta: "software / hardware",
    description: "A home for the things I build, from web interfaces to hardware experiments.",
    subnodes: ["Software", "Hardware"],
  },
  {
    href: "/life",
    label: "LIFE",
    code: "02",
    meta: "outside code",
    description: "Small fragments from life, taste, and curiosity.",
    subnodes: ["Notes", "Moments"],
  },
  {
    href: "/contact",
    label: "CONTACT",
    code: "03",
    meta: "signal / connect",
    description: "Reach out for work, ideas, or collaboration.",
    subnodes: ["Email", "GitHub"],
  },
];

const bootLines = [
  "boot::ting_en_chen",
  "indexing portfolio nodes",
  "calibrating interface grid",
  "ready",
];

export default function ColumnPortal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColumn = columns[activeIndex];

  const taskLines = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const id = String(index + 1).padStart(3, "0");
        return `TASK-${id} / ${index % 3 === 0 ? "SYNC" : "OK"}`;
      }),
    [],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05080b] text-[#eef5ed]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(126,255,202,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(126,255,202,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(126,255,202,0.13),transparent_27%),radial-gradient(circle_at_18%_70%,rgba(255,214,128,0.10),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#7effca]/10 to-transparent" />

      <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto] px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-[#7effca]/20 pb-4 font-mono text-xs uppercase tracking-[0.22em]">
          <Link href="/" className="text-[#7effca] transition hover:text-[#eef5ed]">
            TING-EN CHEN
          </Link>
          <div className="hidden items-center gap-4 text-[#98a39a] sm:flex">
            <span>portfolio portal</span>
            <span className="h-2 w-2 bg-[#7effca] shadow-[0_0_18px_rgba(126,255,202,0.9)]" />
          </div>
        </header>

        <section className="grid gap-5 py-6 lg:grid-cols-[220px_1fr_280px]">
          <aside className="hidden border border-[#7effca]/20 bg-[#081014]/80 p-4 font-mono text-xs text-[#9aa59d] lg:block">
            <div className="mb-8 border-b border-[#7effca]/15 pb-3 text-[#7effca]">
              SYSTEM LOG
            </div>
            <div className="space-y-3">
              {bootLines.map((line) => (
                <p key={line}>{">"} {line}</p>
              ))}
            </div>
            <div className="mt-10 space-y-2">
              {taskLines.map((line) => (
                <div key={line} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#7effca]/70" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="grid min-h-[620px] grid-cols-1 gap-2 sm:grid-cols-3">
            {columns.map((column, index) => {
              const isActive = activeIndex === index;
              return (
                <Link
                  key={column.code}
                  href={column.href}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative overflow-hidden border p-3 transition duration-300 sm:p-4 ${
                    isActive
                      ? "border-[#7effca] bg-[#11201d]"
                      : "border-[#7effca]/20 bg-[#091014]/82 hover:border-[#7effca]/70 hover:bg-[#0e1918]"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-[#7effca]/50" />
                  <div className="absolute inset-y-0 right-0 w-px bg-[#7effca]/20" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(126,255,202,0.08),transparent)]" />
                  </div>

                  <div className="flex h-full min-h-[240px] flex-col justify-between gap-5 lg:min-h-0">
                    <div className="font-mono text-xs text-[#7effca]/70">
                      [{column.code}]
                    </div>
                    <div>
                      <p className="mb-4 hidden font-mono text-[11px] uppercase tracking-[0.16em] text-[#98a39a] lg:block [writing-mode:vertical-rl]">
                        {column.meta}
                      </p>
                      <h2 className="font-mono text-4xl font-semibold leading-none text-[#eef5ed] sm:text-5xl lg:[writing-mode:vertical-rl] lg:text-6xl">
                        {column.label}
                      </h2>
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#7effca] opacity-80">
                      enter
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <aside className="grid gap-5 lg:content-stretch">
            <div className="border border-[#7effca]/25 bg-[#081014]/85 p-5">
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-[#7effca]">
                Active node
              </p>
              <p className="font-mono text-5xl font-semibold text-[#eef5ed]">
                [{activeColumn.code}]
              </p>
              <h1 className="mt-5 font-mono text-3xl font-semibold text-[#eef5ed]">
                {activeColumn.label}
              </h1>
              <p className="mt-5 text-sm leading-7 text-[#c7d0c8]">
                {activeColumn.description}
              </p>
              <div className="mt-8 grid gap-2">
                {activeColumn.subnodes.map((node) => (
                  <div
                    key={node}
                    className="flex items-center justify-between border border-[#7effca]/15 bg-[#7effca]/[0.04] px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[#eef5ed]"
                  >
                    <span>{node}</span>
                    <span className="text-[#7effca]">ready</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#ffd680]/35 bg-[#ffd680]/10 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#ffd680]">
                BOOT::TING_EN_CHEN
              </p>
              <pre className="mt-6 whitespace-pre-wrap font-mono text-sm leading-7 text-[#eef5ed]">
{`PROJECTS
  [01] Software
  [02] Hardware

LIFE
CONTACT`}
              </pre>
            </div>

            <div className="border border-[#7effca]/15 p-5 font-mono text-xs leading-6 text-[#98a39a]">
              <p>{">"} hover a column</p>
              <p>{">"} select a node</p>
              <p className="text-[#7effca]">{">"} route ready</p>
            </div>
          </aside>
        </section>

        <footer className="flex flex-col gap-3 border-t border-[#7effca]/20 pt-4 font-mono text-xs uppercase tracking-[0.16em] text-[#98a39a] sm:flex-row sm:items-center sm:justify-between">
          <p>Next.js / TypeScript / personal interface</p>
          <p>local build online</p>
        </footer>
      </div>
    </main>
  );
}
