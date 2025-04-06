import React from "react";
import { Icon } from "@iconify/react";
const Search = () => {
  return (
    <div className="flex gap-2 px-2 py-4">
      <Icon
        color="#fff"
        icon="material-symbols:search"
        width="24"
        height="24"
      />
      <input
        type="text"
        placeholder="Search"
        className="text-[#808080] outline-none"
        min={100}
      />
    </div>
  );
};

export default Search;
