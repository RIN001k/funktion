"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { Album } from "./albums-data";

export default function Lightbox({
  album,
  onClose,
}: {
  album: Album;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + album.photos.length) % album.photos.length),
    [album.photos.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % album.photos.length),
    [album.photos.length]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center px-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-5 right-5 text-white/80 hover:text-white text-3xl leading-none"
      >
        ×
      </button>

      <div className="text-white/70 text-sm mb-4 text-center">
        <span className="font-display text-lg text-white">{album.title}</span>
        <span className="mx-2">·</span>
        {index + 1} / {album.photos.length}
      </div>

      <div
        className="relative w-full max-w-xl aspect-square"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={album.photos[index]}
          alt={`${album.title} — фото ${index + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>

      {album.photos.length > 1 && (
        <div className="flex gap-6 mt-6" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={prev}
            className="text-white/80 hover:text-white border border-white/30 rounded-full w-11 h-11 flex items-center justify-center text-xl"
            aria-label="Предыдущее фото"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="text-white/80 hover:text-white border border-white/30 rounded-full w-11 h-11 flex items-center justify-center text-xl"
            aria-label="Следующее фото"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
