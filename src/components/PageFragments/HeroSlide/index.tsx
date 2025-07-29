import Image, { StaticImageData } from "next/image";
import React from "react";
import { montserrat } from "@src/config";
import { IoIosArrowForward } from "react-icons/io";

interface HeroSlideProps {
  featureMessage: string;
  imgPath: StaticImageData | string;
}

export const HeroSlide = ({ featureMessage, imgPath }: HeroSlideProps) => {
  return (
    <section className="w-full h-[calc(100vh-80px)] xs:max-h-[700px] max-h-[500px] flex flex-col xs:flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-white">
      {/* Left Side - Text Content */}
      <div className="text-center md:text-left max-w-xl space-y-6">
        <h1
          className={`text-2xl sm:text-2xl md:text-4xl lg:text-4xl font-semibold leading-tight ${montserrat.className}`}
        >
          <span className="text-[#0B1A51] block">
            Dive into endless stories.
          </span>
          <span className="text-[#d8315b] block">Explore now!</span>
        </h1>

        <p className="text-[#888888] text-base sm:text-lg">
          Expand your horizons through the power of literature.
        </p>

        <button className="inline-flex items-center gap-2 bg-[#d8315b] text-white font-medium px-6 py-3 rounded-md hover:bg-[#c9274e] transition-all text-sm sm:text-base">
          Start Now <IoIosArrowForward size={18} />
        </button>
      </div>

      {/* Right Side - Illustration */}
      <div className="mt-10 md:mt-0 w-full md:w-1/3 flex justify-center">
        <Image
          src={imgPath}
          alt="Hero image"
          width={400}
          height={400}
          className=""
          priority
        />
      </div>
    </section>
  );
};
