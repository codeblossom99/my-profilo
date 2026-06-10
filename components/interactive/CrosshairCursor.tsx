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
  const [targetLabel, setTargetLabel] = useState("");

  useEffect(() => {
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

    const updatePosition = (x: number, y: number) => {
      mouseRef.current = { x, y };
      setCoords({ x, y });
      rootRef.current?.classList.add("is-visible", "has-signal");
    };

    const handleMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updatePosition(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      rootRef.current?.classList.remove("is-visible", "is-targeting");
      setTargetLabel("");
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const clickable = target?.closest(SELECTOR) as HTMLElement | null;
      rootRef.current?.classList.toggle("is-targeting", Boolean(clickable));
      setTargetLabel(
        clickable?.dataset.cursorLabel ||
          clickable?.getAttribute("aria-label") ||
          clickable?.textContent?.trim() ||
          "",
      );
    };

    const handleLeave = () => {
      rootRef.current?.classList.remove("is-visible", "is-targeting");
      setTargetLabel("");
    };

    rafRef.current = requestAnimationFrame(render);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
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
        {targetLabel
          ? `click / ${targetLabel}`
          : `x:${coords.x.toString().padStart(4, "0")} y:${coords.y.toString().padStart(4, "0")}`}
      </div>
    </div>
  );
}
