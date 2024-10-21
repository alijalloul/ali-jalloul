"use client";

import { useEffect, useState } from "react";

import styles from "./blinkingEffect.module.css";
const Header = () => {
  const texts = [
    "Full-Stack Web Developer",
    "Full-Stack Mobile Developer",
    "UI/UX Designer",
  ];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [blinking, setBlinking] = useState(true);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[textIndex];
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, prev.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText((prev) => currentFullText.slice(0, prev.length + 1));
        if (currentText.length === currentFullText.length) {
          setBlinking(true);

          setTimeout(() => {
            setIsDeleting(true);
            setBlinking(false);
          }, 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, 50);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, texts]);

  return (
    <header className="flex justify-center items-center py-5">
      <div className="w-[90%] flex">
        <h1 className="text-4xl">Ali Jalloul/</h1>

        <div className="text-2xl flex justify-center items-start">
          <h2 className="text-xl">&nbsp; {currentText}</h2>
          <span className={blinking ? styles.blink : ""}>|</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
