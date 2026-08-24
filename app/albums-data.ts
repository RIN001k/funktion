// Каждый альбом — это одна прошедшая тусовка. Чтобы добавить свой альбом:
// 1. Создай папку в /public/gallery/название-папки
// 2. Положи туда фото (любые имена)
// 3. Добавь объект в этот список ниже, перечислив пути к фото

export type Album = {
  id: string;
  title: string;
  date: string;
  cover: string;
  rotate: string;
  photos: string[];
};

export const albums: Album[] = [
  {
    id: "summer",
    title: "Летняя тусовка",
    date: "Июль 2025",
    cover: "/gallery/summer/photo-1.jpg",
    rotate: "-rotate-3",
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
    title: "Хэллоуин",
    date: "Октябрь 2025",
    cover: "/gallery/halloween/photo-1.jpg",
    rotate: "rotate-2",
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
    title: "Новый год",
    date: "Январь 2026",
    cover: "/gallery/newyear/photo-1.jpg",
    rotate: "rotate-1",
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
