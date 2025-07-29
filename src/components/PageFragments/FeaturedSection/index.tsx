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
    role: "Author and writer",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: img1,
  },
  {
    id: 1,
    name: "John Doe",
    role: "Author",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: img2,
  },
  {
    id: 1,
    name: "Candice Craig",
    role: "writer",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: img3,
  },
  {
    id: 1,
    name: "Olivia Rhye",
    role: "Author and Reader",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: img4,
  },
  {
    id: 1,
    name: "Jeremia Baker",
    role: "Author",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    image: img2,
  },
  {
    id: 1,
    name: "Danny Baker",
    role: "Author & writer",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
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
        Ut enim ad minim veniam, quis nostrud exercitation ullamco boris nisi ut
        aliquip ex ea commodo.
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


