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
      "/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-19-aa8e50-easey.json?v=2",
    )
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  return (
    <div className="mb-4 flex items-center justify-center rounded-xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {deliveryIconData ? (
          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center sm:h-6 sm:w-6">
            <Lottie animationData={deliveryIconData} loop={true} />
          </div>
        ) : (
          <div className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
        )}
        <p className="juujo-eyebrow m-0 pt-0.5 text-[10px] font-bold leading-none tracking-widest text-[var(--gold)] sm:text-xs">
          FREE DELIVERY
        </p>
        <span className="hidden text-xs text-[var(--gold)] opacity-40 sm:block">
          -
        </span>
        <p className="font-serif pt-0.5 text-[15px] font-normal leading-none text-[var(--ink)] sm:text-[17px]">
          {mounted ? deliveryDate || "soon" : "Loading..."}
        </p>
      </div>
    </div>
  );
}
