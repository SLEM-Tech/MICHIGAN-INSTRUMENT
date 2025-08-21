"use client";

import { convertToSlug } from "@constants";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import { StaticImageData } from "next/image";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DiscoveryCard from "../DiscoveryCardSection";

export type Book = {
  id: string | number;
  title: string;
  author: string;
  oldAmount?: string;
  newAmount: string;
  image: string | StaticImageData;
  description: string;
};

export const Loader = () => (
  <>
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="sm:w-[300px] min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0"
      />
    ))}
  </>
);

export const MainLoader = () => (
  <div className="w-full h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0" />
);

const SortedProducts = () => {
  const sliderRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: Book[];
  }>({});

  const { data: categories, isLoading: categoryLoading } = useCategories("");

  const mapProductToBook = (product: any): Book => ({
    id: product.id,
    title: product.name,
    author: product?.attributes?.[0]?.options?.[0] || "Unknown Author",
    newAmount: product?.price
      ? `₦${Number(product.price).toLocaleString()}`
      : "N/A",
    image: product?.images?.[0]?.src || "/placeholder.jpg",
    description: product?.description || "No description available",
  });

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);
        const filteredCategories = categories
          ?.filter((cat: CategoryType) => cat?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productFetches = filteredCategories.map(async (cat: any) => {
            const res = await WooCommerce.get(`products?category=${cat.id}`);
            const books: Book[] = res.data.map(mapProductToBook);
            return { [cat.id]: books };
          });

          const results = await Promise.all(productFetches);
          const bookMap = results.reduce(
            (acc, res) => ({ ...acc, ...res }),
            {}
          );
          setCategoryProductsMap(bookMap);
        }
      } catch (err) {
        console.error("Error fetching category products", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const handleNext = (catId: string | number) => {
    const currentSlider = sliderRefs.current[catId];
    if (currentSlider) {
      const { scrollLeft, scrollWidth, clientWidth } = currentSlider;
      const maxScroll = scrollWidth - clientWidth;
      if (scrollLeft < maxScroll) {
        currentSlider.scrollLeft += 600;
      }
    }
  };

  const handlePrev = (catId: string | number) => {
    const currentSlider = sliderRefs.current[catId];
    if (currentSlider && currentSlider.scrollLeft > 0) {
      currentSlider.scrollLeft -= 600;
    }
  };

  return (
    <div className="mb-8 lg:mb-16">
      <h2 className="text-3xl font-semibold text-[#0A2463] my-2 text-center">
        Discover Your Next Book
      </h2>
      <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto text-center">
        Uncover books that match your interests, mood, and imagination.
      </p>

      {isLoading && <MainLoader />}

      {categories
        ?.filter((cat: CategoryType) => cat.count > 0)
        ?.slice(0, 5)
        ?.map((cat: CategoryType) => {
          const books = categoryProductsMap[cat.id] || [];

          return (
            <div
              key={cat.id}
              className="flex flex-col gap-5 sm:gap-16 justify-center mb-10 sm:mb-12 px-10"
            >
              {/* Title */}
              <div className="w-full flex justify-between items-center px-4">
                <span className="text-[18px] border-b-2 border-[#D62E55]">
                  <Link
                    href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
                    dangerouslySetInnerHTML={{ __html: cat.name }}
                    className="text-[18px] text-left text-[#0a2463] py-1 sm:text-3xl font-normal capitalize"
                  />
                </span>
                <div className="xs:hidden md:block">
                  <Link
                    href={`/category/${convertToSlug(cat.name)}-${cat.id}`}
                    className="mt-2 text-sm font-medium text-[#303030] hover:underline"
                  >
                    View all
                  </Link>
                </div>
              </div>

              {/* Carousel */}
              <Carousel
                totalDataNumber={books.length}
                maxScrollTotal={0} // You can compute these individually if needed
                scrollLeftTotal={0}
                handleNext={() => handleNext(cat.id)}
                handlePrev={() => handlePrev(cat.id)}
              >
                <div
                  ref={(el) => (sliderRefs.current[cat.id] = el)}
                  className="w-full flex space-x-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar px-4 sm:px-8"
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    books.map((book) => (
                      <div
                        key={book.id}
                        className="w-1/2 md:w-1/3 lg:w-1/4 max-w-[300px] shrink-0 px-2"
                      >
                        <DiscoveryCard
                          id={book?.id}
                          author={book?.author}
                          title={book?.title}
                          image={book?.image}
                          newAmount={book?.newAmount}
                          description=""
                        />
                      </div>
                    ))
                  )}
                </div>
              </Carousel>
            </div>
          );
        })}
    </div>
  );
};

export default SortedProducts;
