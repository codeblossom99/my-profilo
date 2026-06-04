"use client";

import { useEffect, useRef, useState } from "react";

const SELECTOR = "a, button, [role='button'], input, textarea, select";

export default function CrosshairCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const renderedRef = useRef({ x: -100, y: -100 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const render = () => {
      const target = mouseRef.current;
      const rendered = renderedRef.current;
      rendered.x += (target.x - rendered.x) * 0.28;
      rendered.y += (target.y - rendered.y) * 0.28;

      hLineRef.current?.style.setProperty("--cursor-y", `${rendered.y}px`);
      vLineRef.current?.style.setProperty("--cursor-x", `${rendered.x}px`);
      markRef.current?.style.setProperty("--cursor-x", `${rendered.x}px`);
      markRef.current?.style.setProperty("--cursor-y", `${rendered.y}px`);
      labelRef.current?.style.setProperty("--cursor-x", `${rendered.x}px`);
      labelRef.current?.style.setProperty("--cursor-y", `${rendered.y}px`);

      rafRef.current = requestAnimationFrame(render);
    };

    const handleMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      setCoords({ x: event.clientX, y: event.clientY });
      rootRef.current?.classList.add("is-visible");
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      rootRef.current?.classList.toggle("is-targeting", Boolean(target?.closest(SELECTOR)));
    };

    const handleLeave = () => {
      rootRef.current?.classList.remove("is-visible", "is-targeting");
    };

    rafRef.current = requestAnimationFrame(render);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="crosshair-cursor" aria-hidden="true">
      <div ref={hLineRef} className="crosshair-cursor__line crosshair-cursor__line--h" />
      <div ref={vLineRef} className="crosshair-cursor__line crosshair-cursor__line--v" />
      <div ref={markRef} className="crosshair-cursor__mark" />
      <div ref={labelRef} className="crosshair-cursor__label">
        x:{coords.x.toString().padStart(4, "0")} y:{coords.y.toString().padStart(4, "0")}
      </div>
    </div>
  );
}
