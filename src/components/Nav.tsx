"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Nav = ({ className }: { className: string }) => {
  const buttons = ["Home", "Projects", "Experience", "Contact Me"];
  const buttonsArr = [buttons[buttons.length - 1]]
    .concat(buttons)
    .concat(buttons[0]);

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [buttonTop, setButtonTop] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      const buttonHeight = containerRef.current.clientHeight / 3;
      setButtonTop(buttonHeight);
    }
  }, [selectedButtonIndex]);

  useEffect(() => {
    const route = buttons[selectedButtonIndex - 1].toLowerCase();
    if (
      selectedButtonIndex > 0 &&
      selectedButtonIndex < buttonsArr.length - 1
    ) {
      router.push(
        `/${route === "contact me" ? "contact" : route === "home" ? "" : route}`
      );
    }
  }, [selectedButtonIndex, router]);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY;
    if (delta > 0 && selectedButtonIndex < buttonsArr.length - 1) {
      setSelectedButtonIndex((prev) =>
        Math.min(prev + 1, buttonsArr.length - 1)
      );
    } else if (delta < 0 && selectedButtonIndex > 0) {
      setSelectedButtonIndex((prev) => Math.max(prev - 1, 0));
    }

    if (delta > 0 && selectedButtonIndex === buttonsArr.length - 2) {
      setSelectedButtonIndex(1);
    } else if (delta < 0 && selectedButtonIndex - 1 === 0) {
      setSelectedButtonIndex(buttonsArr.length - 2);
    }
  };

  function handleClick(index: number) {
    setSelectedButtonIndex(
      index === buttonsArr.length - 1
        ? 1
        : index === 0
        ? buttonsArr.length - 2
        : index
    );
  }

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative items-center h-96 overflow-hidden"
        onWheel={handleScroll}
      >
        {buttonsArr.map((button, index) => (
          <div
            key={index}
            className="absolute w-full h-1/3 flex justify-center transition-all duration-300 ease-in-out"
            style={{ top: buttonTop * (1 + index - selectedButtonIndex) }}
          >
            <button
              className={`text-7xl text-black opacity-100 transition-all duration-300 ease-in-out drop-shadow-2xl ${
                selectedButtonIndex !== index && "!text-4xl opacity-80"
              }`}
              onClick={() => handleClick(index)}
            >
              {button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
