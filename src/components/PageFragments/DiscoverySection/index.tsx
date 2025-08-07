// "use client";

// import React, { useRef, useState } from "react";
// import Carousel from "@src/components/Reusables/Carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import DiscoveryCard from "../DiscoveryCardSection";
// import { StaticImageData } from "next/image";
// import img1 from "@public/images/discovery-section/image1.png";
// import img2 from "@public/images/discovery-section/image2.png";
// import img3 from "@public/images/discovery-section/image3.png";
// import img4 from "@public/images/discovery-section/image4.png";
// import { convertToSlug } from "@constants";

// export type Book = {
//   id: number;
//   title: string;
//   author: string;
//   price: string;
//   image: string | StaticImageData;
// };

// const sampleBooks: Book[] = [
//   {
//     id: 1,
//     title: "Like a Summer",
//     author: "John Strass",
//     price: "NGN19.00",
//     image: img1,
//   },
//   {
//     id: 2,
//     title: "Think Like a Monk",
//     author: "Jay Shetty",
//     price: "NGN21.98",
//     image: img2,
//   },
//   {
//     id: 3,
//     title: "Shatter Me",
//     author: "Tahereh Mafi",
//     price: "NGN20.99",
//     image: img3,
//   },
//   {
//     id: 4,
//     title: "8 Rules of Love",
//     author: "Jay Shetty",
//     price: "NGN24.99",
//     image: img4,
//   },
//   {
//     id: 3,
//     title: "Shatter Me",
//     author: "Tahereh Mafi",
//     price: "NGN20.99",
//     image: img3,
//   },
//   {
//     id: 4,
//     title: "8 Rules of Love",
//     author: "Jay Shetty",
//     price: "NGN24.99",
//     image: img4,
//   },
// ];

// const Loader = () => (
//   <>
//     {[...Array(6)].map((_, idx) => (
//       <div
//         key={idx}
//         className="min-w-[240px] sm:min-w-[280px] h-[180px] sm:h-[280px] bg-gray-200 animate-pulse rounded-md shrink-0"
//       />
//     ))}
//   </>
// );

// const DiscoverySection = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [maxScrollTotal, setMaxScrollTotal] = useState(0);
//   const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleNext = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       const maxScroll = scrollWidth - clientWidth;
//       setScrollLeftTotal(scrollLeft);
//       setMaxScrollTotal(maxScroll);

//       sliderRef.current.scrollLeft += 600;
//       setCurrentIndex((prevIndex) =>
//         prevIndex < sampleBooks.length - 1 ? prevIndex + 1 : prevIndex
//       );
//     }
//   };

//   const handlePrev = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       const maxScroll = scrollWidth - clientWidth;
//       setScrollLeftTotal(scrollLeft);
//       setMaxScrollTotal(maxScroll);

//       if (scrollLeft > 0) {
//         sliderRef.current.scrollLeft -= 600;
//         setCurrentIndex((prevIndex) =>
//           prevIndex > 0 ? prevIndex - 1 : prevIndex
//         );
//       }
//     }
//   };

//   return (
//     <section className="py-14 px-4 w-full overflow-hidden">

//       <h2 className="text-3xl font-semibold text-[#0A2463] my-2 text-center">
//         Discover Your Next book
//       </h2>
//       <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto text-center">
//         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
//         ut aliquip ex ea commodo.
//       </p>

//       <div className="w-full">
//         <Carousel
//           totalDataNumber={sampleBooks.length}
//           maxScrollTotal={maxScrollTotal}
//           scrollLeftTotal={scrollLeftTotal}
//           handleNext={handleNext}
//           handlePrev={handlePrev}
//         >
//           <div
//             ref={sliderRef}
//             className="w-full flex space-x-6 overflow-x-auto scroll-smooth overflow-y-hidden no-scrollbar px-4 sm:px-8"
//           >
//             {isLoading ? (
//               <Loader />
//             ) : (
//               sampleBooks.map((book) => (
//                 <div
//                   key={book.id}
//                   className="min-w-[240px] sm:min-w-[280px] max-w-[300px] shrink-0"
//                 >
//                   <DiscoveryCard book={book} />
//                 </div>
//               ))
//             )}
//           </div>
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export default DiscoverySection;

"use client";

import { convertToSlug } from "@constants";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import { StaticImageData } from "next/image";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import DiscoveryCard from "../DiscoveryCardSection";

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string | StaticImageData;
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: categories, isLoading: categoryLoading } = useCategories("");

  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: Book[];
  }>({});

  // Utility: Convert WooCommerce product to Book format
  const mapProductToBook = (product: any): Book => ({
    id: product.id,
    title: product.name,
    author: product?.attributes?.[0]?.options?.[0] || "Unknown Author",
    price: product?.price
      ? `₦${Number(product.price).toLocaleString()}`
      : "N/A",
    image: product?.images?.[0]?.src || "/placeholder.jpg",
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

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      sliderRef.current.scrollLeft += 600;
      setCurrentIndex((prev) => (scrollLeft < maxScroll ? prev + 1 : prev));
    }
  };

  const handlePrev = () => {
    if (sliderRef.current && sliderRef.current.scrollLeft > 0) {
      sliderRef.current.scrollLeft -= 600;
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  return (
    <div className="mb-8 lg:mb-16">
      <h2 className="text-3xl font-semibold text-[#0A2463] my-2 text-center">
        Discover Your Next book
      </h2>
      <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto text-center">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo.
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
                    books.map((book) => (
                      <div
                        key={book.id}
                        className="w-1/2 md:w-1/3 lg:w-1/4 max-w-[300px] shrink-0 px-2"
                      >
                        <DiscoveryCard book={book} />
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
