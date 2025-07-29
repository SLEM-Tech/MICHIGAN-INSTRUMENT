import React from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface CarouselProps {
  totalDataNumber: number;
  maxScrollTotal?: number;
  scrollLeftTotal?: number;
  children: React.ReactNode;
  handlePrev: () => void;
  handleNext: () => void;
}

const Carousel = ({
  totalDataNumber,
  maxScrollTotal,
  scrollLeftTotal,
  children,
  handlePrev,
  handleNext,
}: CarouselProps) => {
  const isAtStart = !scrollLeftTotal || scrollLeftTotal <= 0;
  const isAtEnd =
    typeof scrollLeftTotal === "number" &&
    typeof maxScrollTotal === "number" &&
    scrollLeftTotal >= maxScrollTotal;

  return (
    <div className="relative">
      {totalDataNumber > 3 && (
        <div className="hidden sm:flex w-[2.5rem] sm:w-[4rem] justify-between bg-white px-1 sm:px-2 py-1.5 sm:py-2 rounded-lg absolute -top-10 -right-1 lg:-right-9 drop-shadow-sm z-10">
          <BiSolidLeftArrow
            onClick={handlePrev}
            className={`text-xl cursor-pointer hover:scale-105 transition ${
              isAtStart ? "text-gray-300 cursor-not-allowed" : "text-primary"
            }`}
          />
          <BiSolidRightArrow
            onClick={handleNext}
            className={`text-xl cursor-pointer hover:scale-105 transition ${
              isAtEnd ? "text-gray-300 cursor-not-allowed" : "text-primary"
            }`}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Carousel;
