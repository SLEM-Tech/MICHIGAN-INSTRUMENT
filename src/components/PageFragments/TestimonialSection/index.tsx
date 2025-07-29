// components/Testimonial/TestimonialSection.

"use client"
import React, { useEffect, useRef, useState } from "react";
import img1 from "@public/images/testimonial-section/image1.png";
import img2 from "@public/images/testimonial-section/image2.png";
import img3 from "@public/images/testimonial-section/image3.png";
import img4 from "@public/images/testimonial-section/image4.png";
import TestimonialCard from "../TestimonialCard";
import { Carousel } from "react-responsive-carousel";
import { StaticImageData } from "@node_modules/next/image";

export type TestimonyCard = {
  id: number;
  name: string;
  quote: string;
  image: string | StaticImageData;
};

const testimony: TestimonyCard[] = [
  {
    id: 1,
    name: "Olivia Rhye",
    quote:
      "Every book you pick up has its own lesson or lessons, and quite often the bad books have more to teach.",
    image: img1,
  },
  {
    id: 1,
    name: "John Doe",
    quote:
      "Every book you pick up has its own lesson or lessons, and quite often the bad books have more to teach.",
    image: img2,
  },
  {
    id: 1,
    name: "Candice Craig",
    quote:
      "Every book you pick up has its own lesson or lessons, and quite often the bad books have more to teach.",
    image: img3,
  },
  {
    id: 1,
    name: "Danny Baker",
    quote:
      "Every book you pick up has its own lesson or lessons, and quite often the bad books have more to teach.",
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

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<Carousel | null>(null);

  const changeSlide = () => {
    setCurrentSlide((prevSlide) => {
      const nextIndex = (prevSlide + 1) % 6; // Cycle through slides
      carouselRef.current?.moveTo(nextIndex);
      return nextIndex;
    });
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      changeSlide();
    }, 15000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-[#FDFDFD] text-center">
      <div className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#031B4E] flex items-center justify-center gap-2">
          <span className="text-pink-600 text-3xl font-bold">◠</span>
          What Our Readers Says
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl mx-auto">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco boris nisi
          ut aliquip ex ea commodo.
        </p>
      </div>

      <div className="lg:mt-[70px]">
        <Carousel
          ref={carouselRef}
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={false}
          showIndicators={false}
          autoPlay={false}
          selectedItem={currentSlide}
          onChange={(index) => {
            setCurrentSlide(index);
            resetInterval();
          }}
          interval={15000}
        >
          {testimony.map((test: TestimonyCard) => (
            <TestimonialCard
              key={test.id}
              image={test.image}
              quote={test.quote}
              name={test.name}
            />
          ))}
        </Carousel>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
      </div>
    </section>
  );
};

export default TestimonialSection;
