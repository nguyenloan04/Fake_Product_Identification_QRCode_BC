import React from "react";
import { Icon } from "@iconify/react";
const Hero = () => {
  return (
    <section className="relative container overflow-hidden rounded-xl">
      <img
        src={"/images/thumbnail_home.png"}
        alt="thumb"
        className="h-[732px] w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      <article className="absolute top-1/2 left-[60px] -translate-y-3/5 transform text-white">
        <h1 className="w-1/2 text-5xl leading-tight font-semibold">
          Agriculture is the foundation upon which
          the world thrives.
        </h1>
        <div className="relative my-10 pl-4 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[2px] before:bg-[#84D187]">
          <div className="mb-2 text-xl">
            <span className="mr-2 inline-block font-medium">
              Sale up to
            </span>
            <span className="rounded-lg bg-[#00B207] px-3 py-1 font-semibold uppercase">
              30% OFF
            </span>
          </div>
          <span className="text-sm font-light">
            Free shipping on all your order.
          </span>
        </div>
        <button className="text-md flex items-center gap-4 rounded-full bg-white px-10 py-4 font-semibold text-[#00B207] outline-none">
          Shop now
          <Icon
            icon="solar:arrow-right-linear"
            width="24"
            height="24"
          />
        </button>
      </article>
    </section>
  );
};

export default Hero;
