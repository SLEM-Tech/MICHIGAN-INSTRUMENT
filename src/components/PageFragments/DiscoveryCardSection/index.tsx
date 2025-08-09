import React, {useState} from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { convertToSlug } from "@constants";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { AiOutlineMinus, AiOutlinePlus } from "@node_modules/react-icons/ai";
import { useCart } from "react-use-cart";


export interface Book {
  id: string | number;
  title: string;
  author: string;
  oldAmount?: string;
  newAmount: string;
  image: string | StaticImageData;
  description: string;
}

const DiscoveryCard = ({
  id,
  title,
  author,
  oldAmount,
  newAmount,
  image,
  description,
}:Book) => {
  const router = useRouter();
  const { addItem, removeItem, updateItem, getItem } = useCart();
  const [count, setCount] = useState(0);
  const ID = id.toString();
  const cartItem = getItem(ID);
  const cartItemCount = cartItem ? cartItem.quantity : 0;
  const NewAmount = parseInt(newAmount.replace(/[₦,]/g, ""), 10);
  const slugDesc = convertToSlug(description);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(count + 1);
    addItem({
      id: ID,
      name: description,
      price: NewAmount,
      quantity: count,
      image: image,
    });
  };

  const handleMinusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = Math.max(count - 1, 0);
    if (newCount === 0) {
      removeItem(ID);
    } else {
      updateItem(ID, { quantity: newCount });
    }
    setCount(newCount);
  };

  const handlePlusCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newCount = count + 1;
    addItem({
      id: ID,
      name: description,
      price: NewAmount,
      quantity: newCount,
      image: image,
    });
    setCount(newCount);
  };

  return (
    <div className="text-center border ">
      <div
        // href={`/home-item/product/${slugDesc}-${id}`}
        className="bg-white shadow-sm rounded-lg overflow-hidden block cursor-pointer"
      >
        <div className="relative w-full aspect-[2/2] overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
            loading="lazy"
          />
        </div>

        <div className="mt-3 px-2">
          <p className="text-sm text-gray-500 truncate">{author}</p>
          <p className="font-bold text-base text-blue-900 line-clamp-1">
            {title}
          </p>
          <div className="flex items-center justify-around">
            <p className="text-red-500 text-sm font-medium leading-[1.8]">
              {NewAmount ? <FormatMoney2 value={NewAmount} /> : "Out of Stock"}
              
            </p>

            <div
              className={`flex items-center gap-1 rounded-md text-white p-1 text-xs transition ${
                cartItemCount !== 0 && "bg-red-500"
              }`}
            >
              {cartItemCount === 0 ? (
                <div
                  onClick={handleCartClick}
                  className="bg-white text-red-500 text-[10px] px-2 py-1 border border-red-500"
                >
                  ADD
                </div>
              ) : (
                <>
                  <AiOutlineMinus onClick={handleMinusCartClick} />
                  <span>{cartItemCount}</span>
                  <AiOutlinePlus onClick={handlePlusCartClick} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCard;
