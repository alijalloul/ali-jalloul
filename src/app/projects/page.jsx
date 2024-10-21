"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import image1 from "@/public/icon.png";

const Page = () => {
  const texts = ["First Text", "Second Text", "Third Text", "Fourth Text"];

  const [isMouseOver, setIsMouseOver] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".animated-text",
      { right: "-100%" },
      {
        right: (index) => `${10 * index}%`,
        duration: 1,
        delay: (index) => index * 0.5,
      }
    );
  }, []);

  function handleMouseOver() {
    setIsMouseOver(true);
  }

  function handleMouseLeave() {
    setIsMouseOver(false);
  }

  function handleMouseMove(e) {
    if (isMouseOver && imageRef.current) {
      const x = e.clientX - 250; // Adjusted for centering
      const y = e.clientY - 250; // Adjusted for centering

      gsap.to(".move-image", {
        left: x,
        top: y,
        duration: 0.1,
      });
    }
  }

  return (
    <div className="h-full flex flex-col justify-between items-center">
      {texts.map((text, index) => (
        <div
          key={index}
          className="relative text-4xl opacity-80 font-bold animated-text select-none"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {text}
        </div>
      ))}

      <div
        ref={imageRef}
        className={`move-image absolute aspect-[4/5]  border-2 border-red-100 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMouseOver ? " w-52" : "w-0 hidden"
        }`}
      >
        <Image
          className="object-contain"
          alt="image"
          src={image1}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Page;
