"use client";
import React, { useEffect, useState } from "react";
import { CartIconSvg, UserIconSvg } from "../SvgIcons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Drawer from "react-modern-drawer";
import { useCart } from "react-use-cart";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./MobileNav";
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
import { ImSpinner2 } from "react-icons/im";
import { PiShoppingCartSimple } from "react-icons/pi";
import { LogoImage } from "@utils/function";
import SearchInput from "../Reusables/SearchInput";
import { GrClose } from "react-icons/gr";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import FormToast from "../Reusables/Toast/SigninToast";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import Picture from "../picture/Picture";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { BiMenuAltLeft } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems, items } = useCart();
  const isUserPathname = pathname.includes("user");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isUserClick, setIsUserClick] = useState(false);
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

      <header className="flex flex-col h-25 w-full z-50 fixed top-0 bg-white transition drop-shadow-md">
        {/* Yellow background header */}
        <div className="bg-[#f8cb47] py-4 h-4 flex w-full xs:px-1 lg:px-16 lg:items-center lg:justify-between">
          <div className="xs:hidden lg:flex text-xs font-normal lg:w-full">
            <p className="w-full">Delivery in 10 minutes</p>
          </div>

          <div className="flex text-xs gap-5 xs:justify-center xs:w-full ">
            <Link className="flex gap-1 items-center" href={""}>
              <MdOutlineLocationOn color="#fff" size={20} />
              <p>Deliver to 423651</p>
            </Link>
            <Link className="flex gap-1 items-center" href={""}>
              <TbTruckDelivery color="#fff" size={20} />
              <p>Track your order</p>
            </Link>
            <Link className="flex gap-1 items-center" href={""}>
              <CiDiscount1 color="#fff" size={20} />
              <p>All Offers</p>
            </Link>
          </div>
        </div>

        {/* white background header */}

        <div className="flex items-center justify-around w-full py-4 max-w-[1400px] z-30 px-14 xs:px-1 md:px-14">
          {/* Flex section 1 */}
          <div
            onClick={toggleDrawer}
            className="flex items-center gap-12 cursor-pointer"
          >
            <BiMenuAltLeft color="#88c96f" size={40} />
          </div>
          {/* Flex section 2 */}
          <div className="flex h-10 col-span-2">
            <SearchInput
              className="flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.4rem] bg-[#f3f9fb] !rounded-sm outline-none focus:border-[#f3f9fb] focus:ring-1 transition"
              placeholder="Search essentials, groceries and more..."
              searchValue={searchValue}
              setSearchQuery={setSearchValue}
              onSearch={handleSearch}
              isLoading={false}
            />
          </div>
          {/* Flex section 3 */}
          <div className="flex justify-end gap-1">
            <div
              className="flex gap-2 justify-center items-center cursor-pointer border-r-1"
              onClick={() => router.push("/cart")}
            >
              {typeof window !== "undefined" && (
                <div className="flex relative justify-center items-center rounded-full size-9 p-2 text-sm">
                  <span className="absolute top-[-2px] right-[1] size-4 text-[#88c96f] text-xs shadow-lg flex justify-center items-center rounded-full">
                    {totalItems === 0 ? "" : totalItems}
                  </span>
                  <div className="flex items-center justify-right gap-1 ">
                    <PiShoppingCartSimple className="fill-[#88c96f] size-6" />
                    <p className="xs:hidden font-semibold text-sm text-[#88c96f]">
                      Cart
                    </p>
                  </div>
                </div>
              )}
              <span
                className="truncate text-sm text-[#88c96f] font-semibold w-16 overflow-hidden"
                title={`₦${calculateSubtotal().toString()}`}
              >
                <FormatMoney2 value={calculateSubtotal()} />
              </span>
            </div>

            <div className="flex gap-2 justify-center items-center">
              {wc_customer_info?.shipping?.address_2 ? (
                <Picture
                  src={wc_customer_info?.shipping?.address_2}
                  alt={"user-image"}
                  loading="eager"
                  className="size-10 rounded-full object-contain"
                />
              ) : firstName ? (
                <div className="flex justify-center items-center w-12 h-12">
                  <span className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300 text-white text-xl font-semibold">
                    {getFirstCharacter(firstName)}
                  </span>
                </div>
              ) : (
                <div className="flex">
                  <UserIconSvg className="size-6 text-[#88c96f] font-bold" />
                </div>
              )}

              <div className="flex flex-col text-[#88c96f] font-semibold text-sm">
                {firstName ? (
                  <div
                    className="flex gap-1.5 items-center cursor-pointer group relative"
                    // onClick={() => router.push("/user/dashboard")}
                    onClick={handleisMobileNavClick}
                  >
                    <span
                      title={firstName}
                      className="line-clamp-1 overflow-y-hidden w-12"
                    >
                      {firstName}
                    </span>
                    <SlArrowDown className="text-primary group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out" />
                    <AnimatePresence>
                      {isUserClick && (
                        <motion.nav
                          initial={{ y: -100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -100, opacity: 0 }}
                          className="flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute right-0 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light"
                        >
                          {mobileDropDownLinks.map((item, i) => (
                            <Link
                              key={i}
                              href={item.href}
                              className={`${
                                pathname === item.href
                                  ? "text-primary"
                                  : "text-black"
                              } flex gap-1.5 px-4 items-center hover:text-primary`}
                            >
                              {item.icon}
                              {item.label}
                            </Link>
                          ))}
                          <span
                            onClick={() => signOut()}
                            className="text-center pt-1 pb-2 text-gray-500 hover:text-primary border-t"
                          >
                            Log Out
                          </span>
                        </motion.nav>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className=" flex flex-col">
                    <span
                      className="cursor-pointer transition"
                      onClick={() => router.push("/user/login")}
                    >
                      Log In
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        {/* <div className="flex flex-col items-center w-full slg:hidden px-2 xs:px-4 py-4">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-1">
              <GiHamburgerMenu
                onClick={toggleDrawer}
                className="text-3xl text-primary hover:scale-105 transition-[.5]"
              />
              <Link href="/" className="col-span-1">
                <LogoImage className="w-[60px] h-fit" />
              </Link>
            </div>

            <div className="flex gap-4 justify-center items-center cursor-pointer">
              <Dropdown>
                <DropdownTrigger className="">
                  <button
                    type="button"
                    className="bg-white border border-primary hover:bg-black cursor-pointer transition-[.4] group text-primary text-xl group-hover:text-white rounded-full p-0 size-8"
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
                        className={`w-fit ${isSelected ? "text-primary" : ""}`}
                      >
                        {`${currency.country} | ${currency.code} (${currency.symbol})`}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
              {firstName ? (
                <div
                  className="flex gap-1.5 items-center h-full cursor-pointer group relative"
                  onClick={handleisMobileNavClick}
                >
                  {wc_customer_info?.shipping?.address_2 ? (
                    <Picture
                      src={wc_customer_info?.shipping?.address_2}
                      alt={"user-image"}
                      loading="eager"
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  ) : (
                    <span className="flex justify-center items-center w-8 h-8 p-4 rounded-full bg-gray-300 text-white text-xl font-semibold">
                      {getFirstCharacter(firstName)}
                    </span>
                  )}

                  <SlArrowDown className="text-primary text-sm group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out" />
                  <AnimatePresence>
                    {isUserClick && (
                      <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute -left-12 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light"
                      >
                        {mobileDropDownLinks.map((item, i) => (
                          <div
                            key={i}
                            className="flex gap-2 px-4 items-center text-xs"
                          >
                            {item.icon}
                            <Link
                              href={item.href}
                              className={`${
                                pathname === item.href
                                  ? "text-primary"
                                  : "text-black"
                              } hover:text-primary`}
                            >
                              {item.label}
                            </Link>
                          </div>
                        ))}
                        <span
                          onClick={() => signOut()}
                          className="text-center text-xs pt-1 pb-2 text-gray-500 hover:text-primary border-t"
                        >
                          Log Out
                        </span>
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <UserIconSvg
                  onClick={() => router.push("/user/login")}
                  className="w-6 h-6"
                />
              )}

              <div
                className="flex gap-2 justify-center items-center cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                {typeof window !== "undefined" && (
                  <div className="flex relative justify-center items-center rounded-full size-9 p-2 text-sm border">
                    <span className="absolute -top-1 -right-1 size-4 bg-primary text-white text-xs shadow-lg flex justify-center items-center rounded-full">
                      {totalItems}
                    </span>
                    <CartIconSvg className="fill-primary size-5" />
                  </div>
                )}
                <span
                  className={`truncate ${
                    calculateSubtotal() > 0 ? "w-16" : ""
                  } text-sm font-semibold overflow-hidden`}
                  title={`₦${calculateSubtotal().toString()}`}
                >
                  <FormatMoney2 value={calculateSubtotal()} />
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full h-10 mt-2 px-1">
            <SearchInput
              className="flex-1 text-base text-black/70 pl-4 pr-2 !py-1.5 h-[2.8rem] bg-gray-100/30 !rounded-full outline-none focus:border-primary focus:ring-1 transition"
              placeholder="Search for products"
              searchValue={searchValue}
              setSearchQuery={setSearchValue}
              onSearch={handleSearch}
              isLoading={false}
            />
          </div>
        </div> */}
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
              pathname === "/" && "text-[#88c96f]"
            }`}
          >
            Home
            <span
              className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#88c96f] transition-transform duration-500 ${
                pathname === "/" ? "scale-x-100" : "scale-x-0"
              } transform origin-bottom-left group-hover:scale-x-100`}
            />
          </Link>
          <Link
            href={"/contact-us"}
            className={`relative w-fit group py-2 group transition hover: text-base xl:text-xl capitalize text-black-600 font-semibold line-clamp-1 ${
              pathname === "/contact-us" && "text-[#88c96f]"
            }`}
          >
            Contact
            <span
              className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#88c96f] transition-transform duration-500 ${
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
                      className={`text-lg group-hover:text-[#88c96f] ${
                        open ? "text-[#88c96f]" : "text-black-600"
                      }`}
                    />
                  ) : (
                    <IoIosArrowDown
                      className={`text-lg group-hover:text-[#88c96f] ${
                        open ? "text-[#88c96f]" : "text-black-600"
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
                        pathname === `/category` ? "text-[#88c96f]" : ""
                      } hover:text-[#88c96f] transition`}
                    >
                      <h4
                        className={`cursor-pointer group-hover:text-[#88c96f] font-medium transition`}
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
                                ? "text-[#88c96f]"
                                : "text-black-600"
                            } hover:text-[#88c96f] transition`}
                          >
                            <h4
                              className={`cursor-pointer group-hover:text-[#88c96f] font-medium transition`}
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
              pathname === "/faq" && "text-[#88c96f]"
            }`}
          >
            Faqs
            <span
              className={`absolute left-0 bottom-0 h-[3px] top-10 w-[70%] bg-[#88c96f] transition-transform duration-500 ${
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
