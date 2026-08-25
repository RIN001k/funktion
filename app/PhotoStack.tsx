"use client";

import { useEffect, useRef } from "react";

const photos = [
  { src: "/gallery/main/photo-1.jpg", rotate: "-rotate-2" },
  { src: "/gallery/main/photo-2.jpg", rotate: "rotate-1" },
  { src: "/gallery/main/photo-3.jpg", rotate: "-rotate-1" },
  { src: "/gallery/main/photo-4.jpg", rotate: "rotate-2" },
];

export default function PhotoStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll(".reveal");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-md mx-auto max-h-[62vh] overflow-y-auto no-scrollbar px-2 py-4 space-y-6"
    >
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          className={`reveal relative aspect-[4/3] shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${photo.rotate} bg-ink p-1.5 border border-pink/30 overflow-hidden`}
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt="THE FUNKTION — past night"
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  );
}
