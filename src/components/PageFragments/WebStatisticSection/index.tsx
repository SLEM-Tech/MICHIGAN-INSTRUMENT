"use client";
import React from "react";

type Stat = {
  value: number;
  label: string;
};

const stats: Stat[] = [
  { value: 94550, label: "Subscriber" },
  { value: 6000, label: "Product List" },
  { value: 499, label: "Free Download" },
  { value: 280, label: "Ebook" },
];

const index: React.FC = () => {
  return (
    <section className="bg-[#d63262] py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center text-white border-[6px] border-pink-300 rounded-full w-48 h-48 mx-auto"
          >
            <p className="text-4xl font-bold">{stat.value}</p>
            <p className="text-lg mt-2">{stat.label}</p>
            <div className="w-10 h-[1px] bg-white mt-1" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default index;
