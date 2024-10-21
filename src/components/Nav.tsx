"use client";

import { useEffect, useRef, useState } from "react";

const Nav = ({ className }: { className: string }) => {
  const buttons = [
    "Contact Me",
    "Home",
    "Projects",
    "Experience",
    "Contact Me",
    "Contact Me",
    "Home",
  ];

  // Step 1: State to track the selected button index
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Step 2: Effect to scroll the selected button into view
  useEffect(() => {
    if (containerRef.current) {
      const buttonHeight = containerRef.current.clientHeight / 3;
      const scrollToPosition = buttonHeight * (selectedButtonIndex - 1); // Calculate scroll position
      containerRef.current.scrollTo({
        top: scrollToPosition,
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, [selectedButtonIndex, buttons.length]);

  // Step 3: Scroll event handler
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY; // Check scroll direction
    if (delta > 0 && selectedButtonIndex < buttons.length - 1) {
      setSelectedButtonIndex((prev) => Math.min(prev + 1, buttons.length - 1));
    } else if (delta < 0 && selectedButtonIndex > 0) {
      setSelectedButtonIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="flex flex-col h-96 overflow-y-scroll no-scrollbar"
        onWheel={handleScroll} // Step 4: Add wheel event listener
      >
        {buttons.map((button, index) => (
          <div key={index} className="flex-none basis-1/3 flex justify-center ">
            <button
              className={` text-7xl text-black opacity-100 transition-all duration-300 ease-in-out drop-shadow-2xl ${
                selectedButtonIndex !== index && "!text-4xl opacity-80"
              } `}
              onClick={() => {
                setSelectedButtonIndex(index);
              }}
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
