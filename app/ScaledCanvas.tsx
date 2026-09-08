"use client";

import { useEffect, useRef, useState } from "react";

export default function ScaledCanvas({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    function update() {
      if (outerRef.current) {
        setScale(outerRef.current.offsetWidth / width);
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  return (
    <div
      ref={outerRef}
      style={{
        position: "relative",
        width: "100%",
        height: scale ? height * scale : undefined,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
