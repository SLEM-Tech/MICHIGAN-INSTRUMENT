// "use client";
// import React, { useEffect, useState } from "react";
// import { CartIconSvg, UserIconSvg } from "../SvgIcons";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import Drawer from "react-modern-drawer";
// import { useCart } from "react-use-cart";
// import { GiHamburgerMenu } from "react-icons/gi";
// import MobileNav from "./MobileNav";
// import useToken from "../hooks/useToken";
// import * as bi from "react-icons/bi";
// import { FaCartArrowDown } from "react-icons/fa";
// import { useMutation } from "react-query";
// import { getFirstCharacter, signOut } from "@utils/lib";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@nextui-org/react";
// import { FormatMoney2 } from "../Reusables/FormatMoney";
// import { SlArrowDown } from "react-icons/sl";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiShoppingCart } from "react-icons/fi";
// import { Popover, Transition } from "@headlessui/react";
// import { useCategories, useCustomer } from "../lib/woocommerce";
// import {
//   convertToSlug,
//   currencyOptions,
//   filterCustomersByEmail,
// } from "@constants";
// import { ImSpinner2 } from "react-icons/im";
// import { PiShoppingCartSimple } from "react-icons/pi";
// import { LogoImage } from "@utils/function";
// import SearchInput from "../Reusables/SearchInput";
// import { GrClose } from "react-icons/gr";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { APICall } from "@utils";
// import { fetchExchangeRate } from "@utils/endpoints";
// import FormToast from "../Reusables/Toast/SigninToast";
// import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
// import Picture from "../picture/Picture";
// import { CiDiscount1 } from "react-icons/ci";
// import { MdOutlineLocationOn } from "react-icons/md";
// import { TbTruckDelivery } from "react-icons/tb";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { ImMenu } from "react-icons/im";
// import { useAppDispatch, useAppSelector } from "../hooks";
// import { headerMenu } from "@constants";
// import { BsCart4 } from "react-icons/bs";
// import { MdOutlinePersonOutline } from "react-icons/md";

// const Header = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { totalItems, items } = useCart();
//   const isUserPathname = pathname.includes("user");
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [isMobileNav, setIsMobileNav] = useState(false);
//   const [isUserClick, setIsUserClick] = useState(false);
//   const [isSearchLoading, setIsSearchLoading] = useState(false);
//   const { token, email } = useToken();
//   const [searchValue, setSearchValue] = useState("");
//   const { baseCurrency } = useAppSelector((state) => state.currency);
//   const dispatch = useAppDispatch();
//   const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency.code);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // const { token } = useAppSelector((ele) => ele?.auth);

//   const isActive = (path: string) => pathname === path;

//   const [drawerSize, setDrawerSize] = useState<number | string>(400); // Default size

//   useEffect(() => {
//     // Function to update the drawer size based on screen width
//     const handleResize = () => {
//       if (window.innerWidth <= 768) {
//         setDrawerSize("100%"); // Smaller width for mobile
//       } else {
//         setDrawerSize(400); // Default width for larger screens
//       }
//     };

//     // Initial check
//     handleResize();

//     // Add resize event listener
//     window.addEventListener("resize", handleResize);

//     // Clean up event listener on unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const {
//     data: categories,
//     isLoading: categoryWpIsLoading,
//     isError: categoryIsError,
//   } = useCategories("");

//   const Categories: CategoryType[] = categories;
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleDrawer = () => {
//     setIsOpen((prevState) => !prevState);
//   };

//   const { data: customer, isLoading, isError } = useCustomer("");
//   const wc_customer2_info: Woo_Customer_Type[] = customer;
//   const wc_customer_info: Woo_Customer_Type | undefined =
//     filterCustomersByEmail(wc_customer2_info, email);

//   const calculateSubtotal = () => {
//     return items.reduce(
//       (total, item: any) => total + item?.price * item.quantity,
//       0
//     );
//   };

//   const mobileDropDownLinks = [
//     {
//       id: 1,
//       href: "/user/dashboard",
//       icon: <bi.BiUser className="text-base" />,
//       label: "My Account",
//     },
//     {
//       id: 2,
//       href: "/user/my-orders",
//       icon: <FaCartArrowDown className="text-base" />,
//       label: "Orders",
//     },

//     {
//       id: 3,
//       href: "/cart",
//       icon: <FiShoppingCart className="text-base" />,
//       label: "Cart",
//     },
//   ];

//   const handleisMobileNavClick = () => {
//     setIsUserClick(!isUserClick);
//   };
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   const handleSearch = () => {
//     setIsSearchLoading(true);
//     if (pathname === "/search") {
//       setIsSearchLoading(false);
//       router.push(`/search?${searchValue}`);
//     } else {
//       router.push(`/search?${searchValue}`);
//     }
//   };

//   const firstName = wc_customer_info?.first_name;
//   const lastName = wc_customer_info?.last_name;
//   const openDrawer = () => {
//     setDrawerVisible(true);
//   };

//   const closeDrawer = () => {
//     setDrawerVisible(false);
//   };

//   const handleNavMenuClick = () => {
//     setIsMobileNav(!isMobileNav);
//     openDrawer();
//   };

//   const [navbar, setNavbar] = useState(false);

//   const setFixedHandler = () => {
//     if (typeof window !== "undefined") {
//       window.scrollY >= 200 ? setNavbar(true) : setNavbar(false);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       window.addEventListener("scroll", setFixedHandler);

//       return () => {
//         window.removeEventListener("scroll", setFixedHandler);
//       };
//     }
//   }, []);

//   const exchangeRATEMutation = useMutation(
//     async (value: string) => {
//       const response = await APICall(
//         fetchExchangeRate,
//         ["NGN", value],
//         true,
//         true
//       );
//       return response;
//     },
//     {
//       onSuccess: async (data) => {
//         FormToast({
//           message: "Exchange rate retrieved successfully.",
//           success: true,
//         });
//       },
//       onError: (error: any) => {
//         const errorMessage = "Failed to fetch exchange rate. Please try again.";

//         FormToast({
//           message: errorMessage,
//           success: false,
//         });
//       },
//     }
//   );

//   // Handle currency change
//   const handleCurrencyChange = async (keys: "all" | Set<React.Key>) => {
//     const selectedValue = Array.from(keys)[0] as string;

//     // Find the selected currency object
//     const selectedCurrencyObj = currencyOptions.find(
//       (c) => c.code === selectedValue
//     );
//     if (!selectedCurrencyObj) return;

//     // Fetch exchange rate
//     try {
//       const data = await exchangeRATEMutation.mutateAsync(
//         selectedCurrencyObj.code
//       );

//       if (data) {
//         dispatch(setExchangeRate(data));
//         dispatch(setBaseCurrency(selectedCurrencyObj));
//         setSelectedCurrency(selectedValue);
//       }
//     } catch (error) {
//       console.error("Error fetching exchange rate:", error);
//     }
//   };
//   return (
//     <>
//       {/* Desktop */}
//       <header className="flex xs:flex-col md:flex-row">
//         <div className="xs:px-2 flex items-center justify-between h-30 py-4 md:px-20 w-full z-50 fixed top-0 bg-white transition drop-shadow-md">
//           {/* header logo */}
//           <div className="">
//             <Link href={"/"} className="text-4xl text-[#D62E55]">
//               Logo
//             </Link>
//           </div>

//           {/* menu options */}
//           <div className="xs:hidden lg:flex items-center justify-center gap-5  ">
//             <div className="flex items-center justify-between gap-5">
//               {headerMenu.map((menu, i) => (
//                 <Link key={menu.id} href={menu.path}>
//                   {menu.label}
//                 </Link>
//               ))}
//             </div>
//             {/* search */}
//             <div className="flex h-10 col-span-2">
//               <SearchInput
//                 placeholder="...Search"
//                 searchValue={searchValue}
//                 setSearchQuery={setSearchValue}
//                 onSearch={handleSearch}
//                 isLoading={false}
//               />
//             </div>
//           </div>

//           <div className="flex items-center justify-center xs:gap-1 md:gap-2">
//             {/* hamburger menu for mobile */}
//             <div className="lg:hidden slg:hidden" onClick={toggleDrawer}>
//               <ImMenu color="#D62E55" />
//             </div>

//             {/* Login and signup  */}

//             {isLoggedIn ? (
//               <div className="flex items-center justify-center gap-4">
//                 <div className="flex items-center justify-center">
//                   <MdOutlinePersonOutline color="#D62E55" size={22} />
//                   <p className="text-sm text-red-500">John</p>
//                 </div>
//                 <div className="flex items-center justify-center">
//                   <BsCart4 color="#D62E55" size={20} />
//                   <p className="text-sm text-red-500">Cart</p>
//                 </div>
//               </div>
//             ) : (

//               <div className="flex items-center gap-2">
//                 <Link
//                   href="/user/login"
//                   className={`xs:px-2 sm:text-xs sm:px-4 xs:py-1 px-6 lg:py-2 rounded-lg font-normal ${
//                     isActive("/user/login")
//                       ? "bg-transparent text-[#D62E55]"
//                       : "text-gray-600 bg-transparent"
//                   }`}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/user/register"
//                   className={` xs:px-2 sm:text-xs sm:px-4 xs:py-1 px-4 lg:py-2 rounded-lg font-normal ${
//                     isActive("/user/register")
//                       ? "text-[#D62E55] bg-transparent"
//                       : "bg-[#D62E55] text-white"
//                   }`}
//                 >
//                   Sign up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="xs:block md:hidden mt-[50px]">
//           <SearchInput
//             placeholder="...Search"
//             searchValue={searchValue}
//             setSearchQuery={setSearchValue}
//             onSearch={handleSearch}
//             isLoading={false}
//           />
//         </div>
//       </header>

//       <Drawer
//         open={isOpen}
//         onClose={toggleDrawer}
//         direction="left"
//         size={drawerSize}
//         className="px-5"
//       >
//         <div className="mt-4 flex w-full justify-between items-center">
//           <Link href="/" className="text-4xl font-bold">
//             Logo
//           </Link>

//           <GrClose
//             className="text-2xl text-black cursor-pointer hover:scale-95 transition-[.3]"
//             onClick={toggleDrawer}
//           />
//         </div>
//         <div className="flex flex-col justify-center space-y-2 mt-5 lg:mt-10">
//           <Link
//             href={"/"}
//             className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
//               pathname === "/" && "text-[#D62E55]"
//             }`}
//           >
//             Home
//             <span
//               className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
//                 pathname === "/" ? "scale-x-100" : "scale-x-0"
//               } transform origin-bottom-left group-hover:scale-x-100`}
//             />
//           </Link>
//           <Link
//             href={"/"}
//             className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
//               pathname === "/" && "text-[#D62E55]"
//             }`}
//           >
//             Browse
//             <span
//               className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
//                 pathname === "/browse" ? "scale-x-100" : "scale-x-0"
//               } transform origin-bottom-left group-hover:scale-x-100`}
//             />
//           </Link>
//           <Link
//             href={"/"}
//             className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
//               pathname === "/" && "text-[#D62E55]"
//             }`}
//           >
//             About
//             <span
//               className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
//                 pathname === "/about" ? "scale-x-100" : "scale-x-0"
//               } transform origin-bottom-left group-hover:scale-x-100`}
//             />
//           </Link>

//           <Popover className="block relative w-fit">
//             {({ open }) => (
//               <>
//                 <Popover.Button
//                   className={`flex w-fit items-center justify-between gap-2.5 hover: group py-2 lg:pt-3 group transition ${
//                     open && "border-b-[3px] border-#D62E55"
//                   }`}
//                 >
//                   <h2 className="text-base xl:text-xl capitalize text-[#D62E55] font-semibold line-clamp-1">
//                     Category
//                   </h2>

//                   {open ? (
//                     <IoIosArrowUp
//                       className={`text-lg group-hover:text-[#D62E55] ${
//                         open ? "text-[#D62E55]" : "text-black-600"
//                       }`}
//                     />
//                   ) : (
//                     <IoIosArrowDown
//                       className={`text-lg group-hover:text-[#D62E55] ${
//                         open ? "text-[#D62E55]" : "text-black-600"
//                       }`}
//                     />
//                   )}
//                 </Popover.Button>
//                 <Transition
//                   as={React.Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="opacity-0 -translate-x-1"
//                   enterTo="opacity-100 translate-x-0"
//                   leave="transition ease-in duration-150"
//                   leaveFrom="opacity-100 translate-x-0"
//                   leaveTo="opacity-0 -translate-x-1"
//                 >
//                   <Popover.Panel className="pl-4 space-y-4 mx-auto py-3 rounded-md transition">
//                     <Link
//                       href="/category"
//                       className={`flex items-center gap-2 group cursor-pointer text-sm xl:text-base ${
//                         pathname === `/category` ? "text-[#D62E55]" : ""
//                       } hover:text-[#D62E55] transition`}
//                     >
//                       <h4
//                         className={`cursor-pointer group-hover:text-[#D62E55] font-medium transition`}
//                         dangerouslySetInnerHTML={{ __html: "All" }}
//                       />
//                     </Link>
//                     {Categories &&
//                       Categories?.filter(
//                         (item) => item?.name?.toLowerCase() !== "uncategorized"
//                       ).map((item) => {
//                         return (
//                           <Link
//                             key={item?.id}
//                             href={`${
//                               "/category/" +
//                               convertToSlug(item?.name) +
//                               "-" +
//                               item?.id
//                             }`}
//                             className={`flex items-center gap-2 group cursor-pointer text-sm xl:text-base ${
//                               pathname ===
//                               `${
//                                 "/category/" +
//                                 convertToSlug(item?.name) +
//                                 "-" +
//                                 item?.id
//                               }`
//                                 ? "text-[#D62E55]"
//                                 : "text-black-600"
//                             } hover:text-[#D62E55] transition`}
//                           >
//                             <h4
//                               className={`cursor-pointer group-hover:text-[#D62E55] font-medium transition`}
//                               dangerouslySetInnerHTML={{ __html: item?.name }}
//                             />
//                           </Link>
//                         );
//                       })}
//                   </Popover.Panel>
//                 </Transition>
//               </>
//             )}
//           </Popover>

//           <Link
//             href={"/faq"}
//             className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-[#D62E55] font-semibold line-clamp-1 ${
//               pathname === "/faq" && "text-[#D62E55]"
//             }`}
//           >
//             Faqs
//             <span
//               className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
//                 pathname === "/faq" ? "scale-x-100" : "scale-x-0"
//               } transform origin-bottom-left group-hover:scale-x-100`}
//             />
//           </Link>
//         </div>
//       </Drawer>
//     </>
//   );
// };

// export default Header;

"use client";
import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Drawer from "react-modern-drawer";
import { useCart } from "react-use-cart";
import useToken from "../hooks/useToken";
import * as bi from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa";
import { useMutation } from "react-query";
import { getFirstCharacter, signOut } from "@utils/lib";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { SlArrowDown } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import { Popover, Transition } from "@headlessui/react";
import { useCategories, useCustomer } from "../lib/woocommerce";
import {
  convertToSlug,
  currencyOptions,
  filterCustomersByEmail,
} from "@constants";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LogoImage } from "@utils/function";
import SearchInput from "../Reusables/SearchInput";
import { GrClose } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import FormToast from "../Reusables/Toast/SigninToast";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import { BiMenuAltLeft } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks";
import { headerMenu } from "@constants";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, items } = useCart();
  const isUserPathname = pathname.includes("user");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isUserClick, setIsUserClick] = useState(true);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const { token, email } = useToken();
  const [searchValue, setSearchValue] = useState("");
  const { baseCurrency } = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency.code);
  // const { token } = useAppSelector((ele) => ele?.auth);

  const [drawerSize, setDrawerSize] = useState<number | string>(400); // Default size

  useEffect(() => {
    // Function to update the drawer size based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDrawerSize("100%"); // Smaller width for mobile
      } else {
        setDrawerSize(400); // Default width for larger screens
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { data: customer, isLoading, isError } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);

  const calculateSubtotal = () => {
    return items.reduce(
      (total, item: any) => total + item?.price * item.quantity,
      0
    );
  };

  const mobileDropDownLinks = [
    {
      id: 1,
      href: "/user/dashboard",
      icon: <bi.BiUser className="text-base" />,
      label: "My Account",
    },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown className="text-base" />,
      label: "Orders",
    },

    {
      id: 3,
      href: "/cart",
      icon: <FiShoppingCart className="text-base" />,
      label: "Cart",
    },
  ];

  const handleisMobileNavClick = () => {
    setIsUserClick(!isUserClick);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    setIsSearchLoading(true);
    if (pathname === "/search") {
      setIsSearchLoading(false);
      router.push(`/search?${searchValue}`);
    } else {
      router.push(`/search?${searchValue}`);
    }
  };

  const firstName = wc_customer_info?.first_name;
  const lastName = wc_customer_info?.last_name;
  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleNavMenuClick = () => {
    setIsMobileNav(!isMobileNav);
    openDrawer();
  };

  const [navbar, setNavbar] = useState(false);

  const setFixedHandler = () => {
    if (typeof window !== "undefined") {
      window.scrollY >= 200 ? setNavbar(true) : setNavbar(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", setFixedHandler);

      return () => {
        window.removeEventListener("scroll", setFixedHandler);
      };
    }
  }, []);

  const exchangeRATEMutation = useMutation(
    async (value: string) => {
      const response = await APICall(
        fetchExchangeRate,
        ["NGN", value],
        true,
        true
      );
      return response;
    },
    {
      onSuccess: async (data) => {
        FormToast({
          message: "Exchange rate retrieved successfully.",
          success: true,
        });
      },
      onError: (error: any) => {
        const errorMessage = "Failed to fetch exchange rate. Please try again.";

        FormToast({
          message: errorMessage,
          success: false,
        });
      },
    }
  );

  // Handle currency change
  const handleCurrencyChange = async (keys: "all" | Set<React.Key>) => {
    const selectedValue = Array.from(keys)[0] as string;

    // Find the selected currency object
    const selectedCurrencyObj = currencyOptions.find(
      (c) => c.code === selectedValue
    );
    if (!selectedCurrencyObj) return;

    // Fetch exchange rate
    try {
      const data = await exchangeRATEMutation.mutateAsync(
        selectedCurrencyObj.code
      );

      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedCurrencyObj));
        setSelectedCurrency(selectedValue);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };
  return (
    <>
      {/* Desktop */}

      <header className="flex flex-col w-full h-30 z-50 fixed top-0 bg-white transition drop-shadow-md ">
        <div className="flex items-center  xs:justify-between w-full py-4 z-30 xs:pr-4 md:px-14">
          {/* Flex section 1 */}
          <div className="flex basis-1/3 items-center justify-start">
            <Link href="/" className="">
              <LogoImage className="w-[75px] " />
            </Link>
            <div
              onClick={toggleDrawer}
              className="lg:hidden flex items-center gap-12 cursor-pointer"
            >
              <BiMenuAltLeft color="#D62E55" size={40} />
            </div>
          </div>
          {/* Flex section 2 */}
          <div className="basis-1/3 xs:hidden md:flex flex h-10 gap-4">
            <div className="xs:hidden lg:flex flex items-center justify-between gap-5">
              {headerMenu.map((menu, i) => (
                <Link key={menu.id} href={menu.path}>
                  {menu.label}
                </Link>
              ))}
            </div>

            <SearchInput
              className="flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.4rem] bg-[#ffffff] !rounded-xl border border-gray-400 focus:border-[#f3f9fb] focus:ring-1 transition"
              placeholder="Search..."
              searchValue={searchValue}
              setSearchQuery={setSearchValue}
              onSearch={handleSearch}
              isLoading={false}
            />
          </div>
          {/* Flex section 3 */}

          <div className="flex basis-1/3 items-center justify-end gap-4 relative w-full">
            {/* Login / Avatar */}
            <div
              className="flex items-center gap-1 text-[#D62E55] cursor-pointer"
              onClick={() => {
                if (!firstName) {
                  router.push("/user/login");
                } else {
                  handleisMobileNavClick();
                }
              }}
            >
              {firstName ? (
                wc_customer_info?.shipping?.address_2 ? (
                  <img
                    src={wc_customer_info.shipping.address_2}
                    alt="user-avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-white rounded-full text-sm font-bold">
                    {getFirstCharacter(firstName)}
                  </span>
                )
              ) : (
                <FiUser className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">
                {firstName || "Login"}
              </span>
              {firstName && <SlArrowDown className="text-sm ml-1" />}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {isUserClick && firstName && (
                <motion.nav
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="absolute top-8 right-14 bg-white shadow-xl rounded-xl w-40 py-2 z-50"
                >
                  {mobileDropDownLinks?.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 ${
                        pathname === item.href
                          ? "text-[#D62E55]"
                          : "text-gray-700"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                  <div
                    onClick={signOut}
                    className="text-sm text-gray-500 hover:text-[#D62E55] text-center mt-2 cursor-pointer border-t pt-2"
                  >
                    Log Out
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300" />

            {/* Cart */}
            <div
              className="relative flex items-center gap-1 text-[#D62E55] cursor-pointer"
              onClick={() => router.push("/cart")}
            >
              <div className="relative">
                <PiShoppingCartSimple className="size-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#D62E55] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium ml-2">Cart</span>
            </div>

            <Dropdown>
              <DropdownTrigger>
                <button
                  type="button"
                  className="bg-white border border-[#D62E55] hover:bg-black cursor-pointer transition-all duration-300 group text-[#D62E55] text-lg group-hover:text-white rounded-full size-7"
                >
                  {baseCurrency?.symbol}
                </button>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="Select Base Currency"
                selectionMode="single"
                selectedKeys={new Set([selectedCurrency])}
                onSelectionChange={(keys) => {
                  handleCurrencyChange(keys);
                }}
                className="bg-white rounded-md pb-4 text-sm lg:text-base"
              >
                {currencyOptions.map((currency) => {
                  const isSelected = selectedCurrency === currency.code;
                  return (
                    <DropdownItem
                      key={currency.code}
                      value={currency.code}
                      className={`w-fit ${isSelected ? "text-[#D62E55]" : ""}`}
                    >
                      {`${currency.country} | ${currency.code} (${currency.symbol})`}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="xs:block md:hidden w-full xs:mt-[-10px] xs:my-6 h-10 px-4">
          <SearchInput
            className="flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.8rem] bg-gray-100/30 !rounded-full outline-none focus:border-[#D62E55] focus:ring-1 transition"
            placeholder="Search for products"
            searchValue={searchValue}
            setSearchQuery={setSearchValue}
            onSearch={handleSearch}
            isLoading={false}
          />
        </div>
      </header>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        size={drawerSize}
        className="px-5"
      >
        <div className="mt-4 flex w-full justify-between items-center">
          <Link href="/" className="text-4xl font-bold">
            Logo
          </Link>

          <GrClose
            className="text-2xl text-black cursor-pointer hover:scale-95 transition-[.3]"
            onClick={toggleDrawer}
          />
        </div>
        <div className="space-y-2 mt-5 lg:mt-10 w-fit">
          <Link
            href={"/"}
            className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
              pathname === "/" && "text-[#D62E55]"
            }`}
          >
            Home
            <span
              className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
                pathname === "/" ? "scale-x-100" : "scale-x-0"
              } transform origin-bottom-left group-hover:scale-x-100`}
            />
          </Link>
          <Link
            href={"/contact-us"}
            className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
              pathname === "/contact-us" && "text-[#D62E55]"
            }`}
          >
            Contact
            <span
              className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
                pathname === "/contact-us" ? "scale-x-100" : "scale-x-0"
              } transform origin-bottom-left group-hover:scale-x-100`}
            />
          </Link>

          <Popover className="block relative w-fit">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`flex w-fit items-center justify-between gap-2.5 hover: group py-2 lg:pt-3 group transition ${
                    open && "border-b-[3px] border-primary"
                  }`}
                >
                  <h2 className="text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1">
                    Category
                  </h2>

                  {open ? (
                    <IoIosArrowUp
                      className={`text-lg group-hover:text-[#D62E55] ${
                        open ? "text-[#D62E55]" : "text-black-600"
                      }`}
                    />
                  ) : (
                    <IoIosArrowDown
                      className={`text-lg group-hover:text-[#D62E55] ${
                        open ? "text-[#D62E55]" : "text-black-600"
                      }`}
                    />
                  )}
                </Popover.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 -translate-x-1"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-1"
                >
                  <Popover.Panel className="pl-4 space-y-4 mx-auto py-3 rounded-md transition">
                    <Link
                      href="/category"
                      className={`flex items-center gap-2 group cursor-pointer text-sm xl:text-base ${
                        pathname === `/category` ? "text-[#D62E55]" : ""
                      } hover:text-[#D62E55] transition`}
                    >
                      <h4
                        className={`cursor-pointer group-hover:text-[#D62E55] font-medium transition`}
                        dangerouslySetInnerHTML={{ __html: "All" }}
                      />
                    </Link>
                    {Categories &&
                      Categories?.filter(
                        (item) => item?.name?.toLowerCase() !== "uncategorized"
                      ).map((item) => {
                        return (
                          <Link
                            key={item?.id}
                            href={`${
                              "/category/" +
                              convertToSlug(item?.name) +
                              "-" +
                              item?.id
                            }`}
                            className={`flex items-center gap-2 group cursor-pointer text-sm xl:text-base ${
                              pathname ===
                              `${
                                "/category/" +
                                convertToSlug(item?.name) +
                                "-" +
                                item?.id
                              }`
                                ? "text-[#D62E55]"
                                : "text-black-600"
                            } hover:text-[#D62E55] transition`}
                          >
                            <h4
                              className={`cursor-pointer group-hover:text-[#D62E55] font-medium transition`}
                              dangerouslySetInnerHTML={{ __html: item?.name }}
                            />
                          </Link>
                        );
                      })}
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <Link
            href={"/faq"}
            className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
              pathname === "/faq" && "text-[#D62E55]"
            }`}
          >
            Faqs
            <span
              className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#D62E55] transition-transform duration-500 ${
                pathname === "/faq" ? "scale-x-100" : "scale-x-0"
              } transform origin-bottom-left group-hover:scale-x-100`}
            />
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
