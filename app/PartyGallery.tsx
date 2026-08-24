"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Group your photos into albums — one per past event. To add a new
// album, add an entry here and drop the matching files into
// /public/gallery.
type Album = {
  id: string;
  title: string;
  date: string;
  cover: string;
  photos: string[];
};

const albums: Album[] = [
  {
    id: "summer",
    title: "Summer Party",
    date: "August 2025",
    cover: "/gallery/summer/photo-1.jpg",
    photos: [
      "/gallery/summer/photo-1.jpg",
      "/gallery/summer/photo-2.jpg",
      "/gallery/summer/photo-3.jpg",
      "/gallery/summer/photo-4.jpg",
      "/gallery/summer/photo-5.jpg",
      "/gallery/summer/photo-6.jpg",
    ],
  },
  {
    id: "halloween",
    title: "Halloween",
    date: "October 2025",
    cover: "/gallery/halloween/photo-1.jpg",
    photos: [
      "/gallery/halloween/photo-1.jpg",
      "/gallery/halloween/photo-2.jpg",
      "/gallery/halloween/photo-3.jpg",
      "/gallery/halloween/photo-4.jpg",
      "/gallery/halloween/photo-5.jpg",
      "/gallery/halloween/photo-6.jpg",
    ],
  },
  {
    id: "newyear",
    title: "New Year's Eve",
    date: "December 2025",
    cover: "/gallery/newyear/photo-1.jpg",
    photos: [
      "/gallery/newyear/photo-1.jpg",
      "/gallery/newyear/photo-2.jpg",
      "/gallery/newyear/photo-3.jpg",
      "/gallery/newyear/photo-4.jpg",
      "/gallery/newyear/photo-5.jpg",
      "/gallery/newyear/photo-6.jpg",
    ],
  },
];

export default function PartyGallery() {
  const [openAlbum, setOpenAlbum] = useState<Album | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenAlbum(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-20">
      <p className="uppercase tracking-[0.2em] text-xs text-gold mb-2 text-center">
        Atmosphere
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-center mb-14">
        Past events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {albums.map((album, i) => (
          <button
            key={album.id}
            onClick={() => setOpenAlbum(album)}
            className={`group relative aspect-[4/3] shadow-md ${
              i % 3 === 0 ? "-rotate-2" : i % 3 === 1 ? "rotate-1" : "rotate-2"
            } hover:rotate-0 transition-transform duration-300 bg-white p-2 text-left`}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={album.cover}
                alt={album.title}
                fill
                sizes="(max-width: 640px) 90vw, 45vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="font-display text-2xl">{album.title}</p>
                <p className="text-sm text-white/70">
                  {album.date} · {album.photos.length} photos
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {openAlbum && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openAlbum.title}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpenAlbum(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-paper rounded-sm p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl">{openAlbum.title}</h3>
                <p className="text-sm text-ink/50">{openAlbum.date}</p>
              </div>
              <button
                onClick={() => setOpenAlbum(null)}
                aria-label="Close"
                className="text-ink/50 hover:text-ink text-2xl leading-none px-2"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {openAlbum.photos.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-sm"
                >
                  <Image
                    src={src}
                    alt={openAlbum.title}
                    fill
                    sizes="45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
