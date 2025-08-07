// import React, { useState } from "react";
// import { ImSpinner2 } from "react-icons/im";
// import { FaSearch } from "react-icons/fa";
// import { IoSearchOutline } from "react-icons/io5";
// import { HiListBullet } from "react-icons/hi2";

// interface SearchInputProps {
//   placeholder?: string;
//   searchValue?: string; // External searchValue
//   setSearchQuery: (query: string) => void;
//   isLoading?: boolean;
//   onSearch?: () => void;
// }

// const SearchInput: React.FC<SearchInputProps> = ({
//   placeholder = "Search...",
//   searchValue: externalSearchValue, // External searchValue prop
//   setSearchQuery,
//   isLoading = false,
//   onSearch,
// }) => {
//   // Internal state used only if externalSearchValue is not provided
//   const [internalSearchValue, setInternalSearchValue] = useState("");

//   const currentSearchValue = externalSearchValue ?? internalSearchValue;

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = event.target.value;

//     if (externalSearchValue !== undefined) {
//       setSearchQuery(newValue); // Update external state
//     } else {
//       setInternalSearchValue(newValue); // Update internal state
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && onSearch) {
//       onSearch();
//     }
//   };

//   const handleSearchClick = () => {
//     if (onSearch) {
//       onSearch();
//     }
//   };

//   return (
//     <div
//       className={`flex items-center justify-center px-5 border border-[#9e9da1] rounded-3xl overflow-hidden`}
//     >
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="flex-1 text-base text-black/70 pl-2 py-1 border-none outline-none bg-transparent transition"
//         value={currentSearchValue}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//       />

//       {isLoading ? (
//         <ImSpinner2 className="animate-spin mx-auto" />
//       ) : (
//         <IoSearchOutline onClick={handleSearchClick} size={20} cursor="pointer" className="text-[#d8315b] mx-auto" />
//       )}
//     </div>
//   );
// };

// export default SearchInput;


import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiListBullet } from "react-icons/hi2";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  searchValue?: string; // External searchValue
  setSearchQuery: (query: string) => void;
  isLoading?: boolean;
  onSearch?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  className = "",
  searchValue: externalSearchValue, // External searchValue prop
  setSearchQuery,
  isLoading = false,
  onSearch,
}) => {
  // Internal state used only if externalSearchValue is not provided
  const [internalSearchValue, setInternalSearchValue] = useState("");

  const currentSearchValue = externalSearchValue ?? internalSearchValue;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (externalSearchValue !== undefined) {
      setSearchQuery(newValue); // Update external state
    } else {
      setInternalSearchValue(newValue); // Update internal state
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div
      className={`flex items-center rounded-xl overflow-hidden ${className}`}
    >
      {isLoading ? (
        <ImSpinner2 className="animate-spin mx-auto" />
      ) : (
        <IoSearchOutline size={20} className="text-[#D62E55] mx-auto" />
      )}

      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 text-base text-black/70 pl-2 py-1 border-none outline-none bg-transparent transition"
        value={currentSearchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="text-[#3ba8d8] font-semibold transition hover:text-[#3ba8d8] focus:outline-none focus:ring focus:border-blue-300 text-xl size-8 rounded-full"
        onClick={handleSearchClick}
      ></button>
    </div>
  );
};

export default SearchInput;
