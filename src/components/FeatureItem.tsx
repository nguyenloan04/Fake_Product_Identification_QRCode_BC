import React from "react";

export type FeatureType = {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
};

const FeatureItem = ({
  title,
  description,
  icon,
  active,
}: FeatureType) => {
  return (
    <article
      className={
        "flex flex-col items-center py-10 " +
        (active &&
          "border-b-[4px] border-[#00B207]")
      }
    >
      <div
        className={
          "relative mx-32 size-16 bg-cover " +
          (active
            ? "bg-[url('/feature_bg_active.svg')]"
            : "bg-[url('/feature_bg.svg')]")
        }
      >
        <span
          className={
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " +
            (active
              ? "text-white"
              : "text-[#00B207]")
          }
        >
          {icon}
        </span>
      </div>
      <h3 className="pt-4 pb-2 text-lg font-semibold">
        {title}
      </h3>
      <span className="text-sm">
        {description}
      </span>
    </article>
  );
};

export default FeatureItem;
