import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
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
    <div className="text-center border ">
      <Link
        href={`/home-item/product/${slugDesc}-${book.id}`}
        className="bg-white shadow-sm rounded-lg overflow-hidden block"
      >
        <div className="relative w-full aspect-[2/2] overflow-hidden rounded-t-lg">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
            loading="lazy"
          />
        </div>

        <div className="mt-3 px-2">
          <p className="text-sm text-gray-500 truncate">{book.author}</p>
          <p className="font-bold text-base text-blue-900 line-clamp-1">
            {book.title}
          </p>
          <p className="text-red-500 font-semibold">{book.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default DiscoveryCard;
