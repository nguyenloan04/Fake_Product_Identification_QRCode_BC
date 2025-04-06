import { Icon } from "@iconify/react/dist/iconify.js";
import React, {
  useEffect,
  useState,
} from "react";

function Timer({
  targetDate,
}: {
  targetDate: Date;
}) {
  const calculateTimeLeft = () => {
    const difference: number =
      new Date(targetDate).getTime() -
      new Date().getTime();
    if (difference <= 0)
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24),
      ),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24,
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60,
      ),
      seconds: Math.floor(
        (difference / 1000) % 60,
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <ul className="flex items-center justify-center gap-5">
      <li className="text-center">
        <span className="block">
          {timeLeft.days}
        </span>
        <span className="mt-3 block text-[12px] uppercase">
          Days
        </span>
      </li>
      <li className="text-2xl text-white">:</li>
      <li className="text-center">
        <span className="block">
          {timeLeft.hours}
        </span>
        <span className="mt-3 block text-[12px] uppercase">
          Hours
        </span>
      </li>
      <li className="text-2xl text-white">:</li>
      <li className="text-center">
        <span className="block">
          {timeLeft.minutes}
        </span>
        <span className="mt-3 block text-[12px] uppercase">
          Mins
        </span>
      </li>
      <li className="text-2xl text-white">:</li>
      <li className="text-center">
        <span className="block">
          {timeLeft.seconds}
        </span>
        <span className="mt-3 block text-[12px] uppercase">
          Secs
        </span>
      </li>
    </ul>
  );
}

const Banner = () => {
  return (
    <section className="relative container overflow-hidden rounded-xl">
      <img
        src={"/images/banner.png"}
        alt="thumb"
        className="h-[536x] w-full object-fill"
      />
      <article className="absolute top-1/6 left-1/2 -translate-x-1/2 transform text-center text-black">
        <span className="text-sm font-medium">
          Best Deals
        </span>
        <h1 className="text-shadow-md mt-4 pt-2 text-4xl leading-tight font-semibold">
          Sale of the Month
        </h1>
        <Timer
          targetDate={
            new Date(2025, 11, 25, 14, 30, 15)
          }
        />
        <button className="text-md mx-auto mt-6 flex items-center gap-4 rounded-full bg-white px-10 py-4 font-semibold text-[#00B207] outline-none">
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

export default Banner;
