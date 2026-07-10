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

export function DeliveryTimerBox() {
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
      "/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-19-night-easey.json?v=2",
    )
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  return (
    <div className="mb-3 flex items-center justify-center rounded-xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-2.5 sm:p-3">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {deliveryIconData ? (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center sm:h-12 sm:w-12">
            <Lottie animationData={deliveryIconData} loop={true} />
          </div>
        ) : (
          <div className="h-10 w-10 flex-shrink-0 sm:h-12 sm:w-12" />
        )}
        <p className="juujo-eyebrow m-0 pt-0.5 text-[18px] font-bold leading-none tracking-widest !text-[var(--night)] sm:text-[20px]">
          FREE DELIVERY
        </p>
        <span className="hidden text-[15px] text-[var(--night)] opacity-40 sm:block">
          -
        </span>
        <p className="font-serif pt-0.5 text-[17px] font-medium leading-none text-[var(--ink)] sm:text-[19px]">
          {mounted ? `Estimated Delivery: ${deliveryDate || "soon"}` : "Loading..."}
        </p>
      </div>
    </div>
  );
}
