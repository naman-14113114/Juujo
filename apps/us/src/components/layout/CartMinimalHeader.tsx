"use client";

import Image from "next/image";
import Link from "next/link";

export function CartMinimalHeader() {
  return (
    <header className="border-b border-[rgba(58,31,61,.14)] bg-[rgba(247,241,232,.96)]">
      <div className="juujo-wrap grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-3 py-3">
        <span aria-hidden="true" />
        <Link
          aria-label="Juujo home"
          className="inline-flex shrink-0 items-center justify-self-center"
          href="/"
        >
          <Image
            alt="Juujo Logo"
            className="h-auto w-[132px] object-contain sm:w-[160px]"
            height={74}
            priority
            sizes="(min-width: 640px) 160px, 132px"
            src="/media/brand/juujo-logo.png"
            width={220}
          />
        </Link>

        <div className="hidden justify-self-end sm:block">
        </div>
      </div>
    </header>
  );
}

