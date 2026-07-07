"use client";

import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { market } from "@/lib/market";

function useOrderWithinCountdown() {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      // Calculate time remaining until midnight
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      setRemaining(`${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`);
    };
    
    update();
    const interval = window.setInterval(update, 60000); // update every minute
    return () => window.clearInterval(interval);
  }, []);

  return remaining;
}

function useDeliveryDate(daysFromToday: number) {
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);

    const weekday = date.toLocaleString(market.locale, { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleString(market.locale, { month: "long" });

    setDateLabel(`${weekday} ${day} ${month}`);
  }, [daysFromToday]);

  return dateLabel;
}

export function DeliveryTimerBox() {
  const timer = useOrderWithinCountdown();
  const deliveryDate = useDeliveryDate(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div 
      className="w-full rounded-2xl p-4 sm:p-5 flex flex-col gap-1 sm:gap-2 mb-2" 
      style={{ backgroundColor: "color-mix(in oklch, var(--gold) 8%, var(--paper))", borderColor: "color-mix(in oklch, var(--gold) 15%, var(--border))", borderWidth: "1px" }}
    >
      <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Truck size={14} className="sm:w-[16px] sm:h-[16px]" />
          <span>Free Delivery</span>
        </div>
        <div>Order Within</div>
      </div>
      
      <div className="flex justify-between items-end mt-1">
        <div className="font-serif text-lg sm:text-2xl text-[var(--ink)] tracking-tight">
          {mounted ? deliveryDate : "Loading..."}
        </div>
        <div className="font-serif text-2xl sm:text-4xl text-[var(--ink)] leading-none tracking-tight">
          {mounted ? timer : "00:00"}
        </div>
      </div>
    </div>
  );
}
