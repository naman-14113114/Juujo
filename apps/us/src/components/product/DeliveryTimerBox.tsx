"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { market } from "@/lib/market";

function useDeliveryDate(daysFromToday: number) {
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromToday);

      const weekday = date.toLocaleString(market.locale, { weekday: "long" });
      const day = date.getDate();
      const month = date.toLocaleString(market.locale, { month: "long" });

      setDateLabel(`${weekday} ${day} ${month}`);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [daysFromToday]);

  return dateLabel;
}

export function DeliveryTimerBox({ compact = false }: { compact?: boolean }) {
  const deliveryDate = useDeliveryDate(3);
  const [deliveryIconData, setDeliveryIconData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    fetch(
      "/media/products/grounding-sheets/images/lottieflow-ecommerce-14-19-night-easey.json?v=2",
    )
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  return (
    <div
      className={
        compact
          ? "mb-1 grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-2 gap-y-1 sm:flex sm:justify-center sm:gap-3 sm:whitespace-nowrap"
          : "mb-1 flex items-center justify-center gap-2 whitespace-nowrap sm:gap-3"
      }
    >
      {deliveryIconData ? (
        <div
          className={`flex flex-shrink-0 items-center justify-center sm:h-12 sm:w-12 ${compact ? "row-span-2 h-8 w-8" : "h-10 w-10"}`}
        >
          <Lottie animationData={deliveryIconData} loop={true} />
        </div>
      ) : (
        <div
          className={`flex-shrink-0 sm:h-12 sm:w-12 ${compact ? "row-span-2 h-8 w-8" : "h-10 w-10"}`}
        />
      )}
      <p
        className={`m-0 pt-0.5 font-sans font-medium leading-none text-black ${compact ? "text-base sm:text-[18px]" : "text-[18px]"}`}
      >
        FREE DELIVERY
      </p>
      <span className="hidden text-[18px] text-black opacity-40 sm:block">
        -
      </span>
      <p
        className={`pt-0.5 font-sans font-bold text-black ${compact ? "col-start-2 text-sm leading-tight sm:col-auto sm:text-[18px] sm:leading-none" : "text-[18px] leading-none"}`}
      >
        {mounted ? `Arrives by ${deliveryDate || "soon"}` : "Loading..."}
      </p>
    </div>
  );
}
