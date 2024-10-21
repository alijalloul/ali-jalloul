"use client";

import { gsap } from "gsap";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    gsap.fromTo(
      ".animated-text",
      { x: "100vw" },
      {
        x: (index) => `${50 - index * 3}vw`,
        duration: 1,
        delay: (index) => index * 0.5,
      }
    );
  }, []);

  const texts = ["First Text", "Second Text", "Third Text", "Fourth Text"];

  return (
    <div className="relative w-full h-screen flex flex-col items-start space-y-4">
      {texts.map((text, index) => (
        <div key={index} className="text-4xl font-bold animated-text">
          {text}
        </div>
      ))}
    </div>
  );
};

export default page;
