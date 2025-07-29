// components/Testimonial/TestimonialCard.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import { FaStar } from "react-icons/fa";

type Props = {
  image: string | StaticImageData;
  quote: string;
  name: string;
};

const TestimonialCard: React.FC<Props> = ({ image, quote, name }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      <div className="flex w-[150px] h-[150px] relative mb-6">
        {/* Pink box behind the image */}
        <div className="absolute top-[-8px] left-[-8px] w-[130px] h-[120px] bg-[#fcb1c4] z-0 rounded" />

        {/* Image on top */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover mt-[8px] rounded z-10"
        />
      </div>

      <p className="text-lg sm:text-xl text-[#031B4E] font-medium leading-relaxed px-4">
        &quot;{quote}&quot;
      </p>

      <div className="flex items-center justify-center gap-2 mt-6 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} size={24} />
        ))}
      </div>

      <p className="mt-4 text-gray-700 font-medium">{name}</p>
    </div>
  );
};

export default TestimonialCard;
