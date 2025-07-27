"use client";

import React, { useState } from "react";
import showerhead1 from "@public/images/topCategory/showerhead1.png";
import showerhead2 from "@public/images/topCategory/showerhead2.png";
import showerhead3 from "@public/images/topCategory/showerhead3.png";
import showerhead4 from "@public/images/topCategory/showerhead4.png";
import showerhead5 from "@public/images/topCategory/showerhead5.png";
import showerhead6 from "@public/images/topCategory/showerhead6.png";
import showerhead7 from "@public/images/topCategory/showerhead7.png";

import { TopCategoryCard } from "../TopCategoryCard";
import { StaticImageData } from "next/image";

interface TopCategoryCardProps {
  category: string;
  link: string;
  imgPath: StaticImageData | string;
}

interface TopCategorySectionProps {
  className?: string;
}

const categories: TopCategoryCardProps[] = [
  { category: "Shower head", link: "", imgPath: showerhead1 },
  { category: "Shower head", link: "", imgPath: showerhead2 },
  { category: "Shower head", link: "", imgPath: showerhead3 },
  { category: "Shower head", link: "", imgPath: showerhead4 },
  { category: "Shower head", link: "", imgPath: showerhead5 },
  { category: "Shower head", link: "", imgPath: showerhead6 },
  { category: "Shower head", link: "", imgPath: showerhead7 },
];

export const TopCategorySection = ({
  className = "",
}: TopCategorySectionProps) => {
  const [displayMore, setDisplayMore] = useState(false);
  const visibleCategories = displayMore ? categories : categories.slice(0, 7);

  //   const { data: categories, isLoading } = useCategories("");
  //   const Categories = categories || [];

  // If categories are still loading or empty, show a loading state
  //   if (isLoading || Categories.length === 0) {
  //     return <div className="text-center py-10">Loading Top categories...</div>;
  //   }

  return (
    <section
      className={`xs:flex xs:flex-col xs:items-center xs:justify-center lg:block bg-discovery-gradient relative overflow-hidden pt-4 pb-12 ${className}`}
    >
      <span className="xs:text-center lg:text-left relative text-gray-500 border-b-2 border-[#7fc561] py-1 font-medium uppercase text-[18px] lg:text-[20px] tracking-wide z-10">
        Shop From <span className="text-[#7fc561]">Top Categories</span>
      </span>

      <div className="container-v2 mt-12 z-10">
        <div className="grid xs:gap-16 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {visibleCategories.map((cat, i) => (
            <TopCategoryCard key={i} {...cat} />
          ))}
        </div>

        <div
          className="mt-2 text-xs text-right cursor-pointer text-[#7fc561] hover:underline md:mr-6"
          onClick={() => setDisplayMore(!displayMore)}
        >
          {displayMore ? "Show Less" : "Show More"}
        </div>
      </div>
    </section>
  );
};

export default TopCategorySection;
