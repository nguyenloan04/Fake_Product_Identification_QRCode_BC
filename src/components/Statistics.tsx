import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

type Card = {
  title: string;
  description: string;
};

const data: Card[] = [
  {
    title: "Herbicides",
    description: "165 Products",
  },
  {
    title: "Growth Makers",
    description: "137 Products",
  },
  {
    title: "Fungicides",
    description: "34 Products",
  },
  {
    title: "Seeds",
    description: "165 Products",
  },
  {
    title: "Machinery",
    description: "48 Products",
  },
  {
    title: "Insecticides",
    description: "165 Products",
  },
];

function Card({ title, description }: Card) {
  return (
    <div className="flex-1 rounded-sm border-2 border-gray-200 py-8 text-center transition duration-150 hover:cursor-pointer hover:border-[#2C742F] hover:drop-shadow-xl">
      <h4>{title}</h4>
      <span>{description}</span>
    </div>
  );
}
const Statistics = () => {
  return (
    <section className="container">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold">
          Shop by Top Categories
        </h2>
        <span className="text-md flex items-center gap-4 font-semibold text-[#00B207] outline-none">
          View All
          <Icon
            icon="solar:arrow-right-linear"
            width="15"
            height="15"
          />
        </span>
      </div>
      <div className="mt-16 flex justify-between gap-6">
        {data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Statistics;
