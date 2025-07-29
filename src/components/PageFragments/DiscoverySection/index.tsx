"use client";

import React, { useRef, useState } from "react";
import Carousel from "@src/components/Reusables/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DiscoveryCard from "../DiscoveryCardSection";
import { StaticImageData } from "next/image";
import img1 from "@public/images/discovery-section/image1.png";
import img2 from "@public/images/discovery-section/image2.png";
import img3 from "@public/images/discovery-section/image3.png";
import img4 from "@public/images/discovery-section/image4.png";
import { convertToSlug } from "@constants";

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string | StaticImageData;
};

const sampleBooks: Book[] = [
  {
    id: 1,
    title: "Like a Summer",
    author: "John Strass",
    price: "NGN19.00",
    image: img1,
  },
  {
    id: 2,
    title: "Think Like a Monk",
    author: "Jay Shetty",
    price: "NGN21.98",
    image: img2,
  },
  {
    id: 3,
    title: "Shatter Me",
    author: "Tahereh Mafi",
    price: "NGN20.99",
    image: img3,
  },
  {
    id: 4,
    title: "8 Rules of Love",
    author: "Jay Shetty",
    price: "NGN24.99",
    image: img4,
  },
  {
    id: 3,
    title: "Shatter Me",
    author: "Tahereh Mafi",
    price: "NGN20.99",
    image: img3,
  },
  {
    id: 4,
    title: "8 Rules of Love",
    author: "Jay Shetty",
    price: "NGN24.99",
    image: img4,
  },
];

const Loader = () => (
  <>
    {[...Array(6)].map((_, idx) => (
      <div
        key={idx}
        className="min-w-[240px] sm:min-w-[280px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0"
      />
    ))}
  </>
);

const DiscoverySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600;
      setCurrentIndex((prevIndex) =>
        prevIndex < sampleBooks.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600;
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    }
  };

  return (
    <section className="py-14 px-4 w-full overflow-hidden">
      <h2 className="text-3xl font-semibold text-[#0A2463] my-2 text-center">
        Discover Your Next book
      </h2>
      <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto text-center">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo.
      </p>

      <div className="w-full">
        <Carousel
          totalDataNumber={sampleBooks.length}
          maxScrollTotal={maxScrollTotal}
          scrollLeftTotal={scrollLeftTotal}
          handleNext={handleNext}
          handlePrev={handlePrev}
        >
          <div
            ref={sliderRef}
            className="w-full flex space-x-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar px-4 sm:px-8"
          >
            {isLoading ? (
              <Loader />
            ) : (
              sampleBooks.map((book) => (
                <div
                  key={book.id}
                  className="min-w-[240px] sm:min-w-[280px] max-w-[300px] shrink-0"
                >
                  <DiscoveryCard book={book} />
                </div>
              ))
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default DiscoverySection;
