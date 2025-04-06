import FeatureItem, {
  FeatureType,
} from "@/components/FeatureItem";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const featureItems: FeatureType[] = [
  {
    title: "Free Shipping",
    description: "Free shipping with discount",
    icon: (
      <Icon
        icon="hugeicons:delivery-truck-02"
        width="36"
        height="36"
      />
    ),
    active: false,
  },
  {
    title: "Great Support 24/7",
    description: "Instant access to Contact",
    icon: (
      <Icon
        icon="streamline:customer-support-1"
        width="36"
        height="36"
      />
    ),
    active: false,
  },
  {
    title: "Money-Back Guarantee",
    description: "30 days money-back",
    icon: (
      <Icon
        icon="tabler:shopping-bag-check"
        width="36"
        height="36"
      />
    ),
    active: true,
  },
  {
    title: "100% Sucure Payment",
    description: "We ensure your money is save",
    icon: (
      <Icon
        icon="ph:package-light"
        width="36"
        height="36"
      />
    ),
    active: false,
  },
];

const Feature = () => {
  return (
    <section className="container flex items-center justify-between gap-6 border-b-[1px] border-gray-200">
      {featureItems.length > 0
        ? featureItems.map((item) => (
            <FeatureItem
              key={item.title}
              {...item}
            />
          ))
        : null}
    </section>
  );
};

export default Feature;
