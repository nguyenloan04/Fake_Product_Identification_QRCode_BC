import Search from "@/components/Search";
import React from "react";

const Navigator = () => {
  return (
    <nav className="relative bg-[#333333] p-4">
      <ul className="flex justify-center gap-6 text-white">
        <li>Home</li>
        <li>Shop</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
      <div className="absolute top-0 right-4">
        <Search />
      </div>
    </nav>
  );
};

export default Navigator;
