"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { market } from "@/lib/market";

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRemaining((current) => (current <= 0 ? seconds : current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [seconds]);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;

  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

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
  const timer = useCountdown(15 * 60 - 1);
  const deliveryDate = useDeliveryDate(3);
  const [deliveryIconData, setDeliveryIconData] = useState<Record<string, unknown> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/media/products/buudy-led-mask/images/lottieflow-ecommerce-14-19-aa8e50-easey.json")
      .then((res) => res.json())
      .then((data) => setDeliveryIconData(data))
      .catch((err) => console.error("Error loading delivery lottie", err));
  }, []);

  return (
    <div className="mb-4 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[rgba(247,241,232,.55)] p-3 sm:p-5">
      <div className="flex items-center justify-between gap-2 sm:gap-5">
        <div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {deliveryIconData ? (
              <div className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0 flex items-center justify-center">
                <Lottie animationData={deliveryIconData} loop={true} />
              </div>
            ) : (
              <div className="w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0" />
            )}
            <p className="juujo-eyebrow text-[var(--gold)] m-0 leading-none flex items-center h-5 sm:h-7 font-bold text-[10px] sm:text-xs tracking-widest">
              FREE DELIVERY
            </p>
          </div>
          <p className="font-serif mt-1.5 text-base sm:text-2xl text-[var(--ink)] font-normal leading-none whitespace-nowrap">
            {mounted ? (deliveryDate || "soon") : "Loading..."}
          </p>
        </div>
        <div className="text-right">
          <p className="juujo-eyebrow text-[var(--gold)] whitespace-nowrap text-[9px] sm:text-[11px] tracking-tight sm:tracking-widest m-0 leading-none h-5 sm:h-7 flex items-center justify-end font-bold uppercase">
            ORDER WITHIN
          </p>
          <p className="font-serif mt-1.5 text-xl sm:text-[2.2rem] font-normal text-[var(--ink)] leading-none">
            {mounted ? timer : "00:00"}
          </p>
        </div>
      </div>
    </div>
  );
}
