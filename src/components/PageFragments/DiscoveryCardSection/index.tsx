// components/Discovery/DiscoveryCard.tsx
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "@node_modules/next/link";
import { convertToSlug } from "@constants";

export interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string | StaticImageData;
}

const DiscoveryCard: React.FC<{ book: Book }> = ({ book }) => {
  const slugDesc = convertToSlug(book.title);
  return (
    <div className="text-center px-2">
      <Link
        href={`/home-item/product/${slugDesc}-${book.id}`}
        className="bg-white shadow-sm rounded-lg overflow-hidden"
      >
        <div className="relative h-[300px] w-full">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className=""
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500">{book.author}</p>
          <p className="font-bold text-base text-blue-900">{book.title}</p>
          <p className="text-red-500 font-semibold">{book.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default DiscoveryCard;
