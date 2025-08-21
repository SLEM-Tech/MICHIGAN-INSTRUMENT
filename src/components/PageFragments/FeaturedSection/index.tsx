"use client";

import React, { useRef, useState } from "react";
import Carousel from "@src/components/Reusables/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DiscoveryCard from "../DiscoveryCardSection";
import { StaticImageData } from "next/image";
import img1 from "@public/images/featured-section/image1.png";
import img2 from "@public/images/featured-section/image2.png";
import img3 from "@public/images/featured-section/image3.png";
import img4 from "@public/images/featured-section/image4.png";
import { convertToSlug } from "@constants";
import FeaturedSectionCard from "../FeaturedSectionCard";

export type AuthorCard = {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string | StaticImageData;
};

const sampleBooks: AuthorCard[] = [
  {
    id: 1,
    name: "Olivia Rhye",
    role: "Author and Writer",
    description: "Writes stories about love, life, and resilience.",
    image: img1,
  },
  {
    id: 2,
    name: "John Doe",
    role: "Author",
    description: "Creates thrilling mysteries with unexpected twists.",
    image: img2,
  },
  {
    id: 3,
    name: "Candice Craig",
    role: "Writer",
    description: "Explores romance and growth in heartfelt tales.",
    image: img3,
  },
  {
    id: 4,
    name: "Olivia Rhye",
    role: "Author and Reader",
    description: "Shares stories inspired by everyday human experiences.",
    image: img4,
  },
  {
    id: 5,
    name: "Jeremia Baker",
    role: "Author",
    description: "Brings history alive through vivid storytelling.",
    image: img2,
  },
  {
    id: 6,
    name: "Danny Baker",
    role: "Author & Writer",
    description: "Creates fantasy adventures full of imagination.",
    image: img1,
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

const FeaturedSection = () => {
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
        Our Featured Author
      </h2>
      <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto text-center">
        Get to know the voice behind the stories and explore their most
        celebrated works.
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
                  <FeaturedSectionCard author={book} />
                </div>
              ))
            )}
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedSection;


