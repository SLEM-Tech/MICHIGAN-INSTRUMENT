// components/Discovery/DiscoveryCard.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";

export interface AuthorCard {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string | StaticImageData;
}

const FeaturedSectionCard: React.FC<{ author: AuthorCard }> = ({ author }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md max-w-xs">
      <div className="relative h-[300px] w-full">
        <Image
          src={author.image}
          alt={author.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>

      <div className="p-4">
        <h3 className="text-blue-900 font-semibold text-lg">{author.name}</h3>
        <p className="text-pink-600 font-medium mb-2">{author.role}</p>
        <p className="text-gray-500 text-sm mb-4">{author.description}</p>

        <div className="flex gap-3">
          <Link href="#" aria-label="Twitter">
            <FaTwitter className="text-gray-400 hover:text-blue-500 transition" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <FaLinkedinIn className="text-gray-400 hover:text-blue-700 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSectionCard;
