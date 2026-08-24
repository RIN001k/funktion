import Image from "next/image";

// Drop new photos into /public/gallery (named anything) and add them to
// this list — that's the only thing you need to touch to update the
// gallery. Recommended: square-ish images, at least 500x500px.
const photos = [
  { src: "/gallery/party-1.jpg", rotate: "-rotate-3" },
  { src: "/gallery/party-2.jpg", rotate: "rotate-2" },
  { src: "/gallery/party-3.jpg", rotate: "rotate-1" },
  { src: "/gallery/party-4.jpg", rotate: "-rotate-2" },
  { src: "/gallery/party-5.jpg", rotate: "rotate-3" },
  { src: "/gallery/party-6.jpg", rotate: "-rotate-1" },
  { src: "/gallery/party-7.jpg", rotate: "rotate-2" },
  { src: "/gallery/party-8.jpg", rotate: "-rotate-3" },
];

export default function PartyGallery() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-20">
      <p className="uppercase tracking-[0.2em] text-xs text-gold mb-2 text-center">
        Атмосфера
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-center mb-14">
        Фото с прошлых тусовок
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`relative aspect-square shadow-md ${photo.rotate} hover:rotate-0 hover:scale-105 transition-transform duration-300 bg-white p-2`}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={photo.src}
                alt="Фото с прошлого мероприятия"
                fill
                sizes="(max-width: 640px) 45vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
