"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePicture() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    function handleScroll() {
      // Fade out over the first 300px of scroll
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 300);
      setOpacity(newOpacity);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="mb-8"
      style={{ opacity, transition: "opacity 0.1s linear" }}
    >
      <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-(--color-border) sm:h-32 sm:w-32">
        <Image
          src="/profile.jpg"
          alt="Brian Lee"
          width={128}
          height={128}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
