import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ProductCard = ({
  id,
  name,
  image,
  price,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Smoothly scroll to top
    window.location.href = `/product/${id}`;
  };

  return (
    <article
      className={
        id +
        " overflow-hidden rounded-xl border-1 border-gray-200 hover:cursor-pointer hover:border-[#2C742F] hover:drop-shadow-md"
      }
      onClick={() => handleNavigate()}
    >
      <img
        src={image}
        alt=""
        className="h-96 w-auto object-contain"
      />
      <div className="relative m-4 text-lg">
        <h5 className="text-gray-600 hover:text-[#2C742F]">
          {name}
        </h5>
        <strong className="font-medium">
          {price}
        </strong>
        <span className="absolute top-1/2 right-0 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-300 text-black hover:text-[#00B207]">
          <Icon
            icon="proicons:cart"
            width="20"
            height="20"
          />
        </span>
      </div>
    </article>
  );
};
export default ProductCard;
