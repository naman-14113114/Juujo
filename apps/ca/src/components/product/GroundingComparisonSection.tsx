import React from "react";
import { Check } from "lucide-react";

function CheckIcon() {
  return (
    <div className="bg-[var(--gold)]/20 text-[var(--gold)] rounded-full p-1 mx-auto flex items-center justify-center w-8 h-8">
      <Check size={20} strokeWidth={3} />
    </div>
  );
}

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-5 h-5 text-[#c2bcb1] mx-auto"
    >
      <circle cx="10" cy="10" r="9.375" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type BrandValues = [React.ReactNode, React.ReactNode, React.ReactNode, React.ReactNode];

interface ComparisonRowProps {
  title: string;
  subtitle?: string;
  values: BrandValues;
  isLast?: boolean;
}

function ComparisonRow({ title, subtitle, values, isLast = false }: ComparisonRowProps) {
  return (
    <div className={isLast ? "" : "border-b border-[rgba(194,188,177,0.4)]"}>
      <div className="flex flex-col md:flex-row md:items-stretch">
        {/* Feature Info */}
        <div className="w-full md:w-1/3 pr-4 py-2.5 md:py-3.5 flex flex-col justify-center">
          <p className="juujo-display font-semibold text-[var(--plum)] text-base md:text-lg leading-tight">
            {title}
          </p>
          {subtitle && (
            <p className="juujo-display text-[var(--plum-soft)] text-xs md:text-sm font-medium italic mt-0.5 leading-tight">
              {subtitle}
            </p>
          )}
        </div>

        {/* Brand Values */}
        <div className="w-full md:w-2/3">
          <div className="flex h-full items-stretch">
            {values.map((val, idx) => (
              <div
                key={idx}
                className={`w-1/4 py-2.5 md:py-3.5 flex items-center justify-center text-center px-2 min-h-[48px] ${
                  idx === 0
                    ? `bg-[rgba(58,31,61,0.05)] font-semibold text-[var(--plum)] ${isLast ? "rounded-b-2xl" : ""}`
                    : "text-[var(--muted)]"
                }`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GroundingComparisonSection() {
  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12" id="comparison">
      <div className="juujo-wrap max-w-[1144px]">
        {/* Section Header */}
        <div className="mb-8 px-4 text-center md:mb-12">
          <h2 className="juujo-heading hidden md:block pb-2">
            What makes Juujo right for you?
          </h2>
          <h2 className="juujo-heading block md:hidden pb-2 text-[2.2rem]">
            Why is Juujo right for you?
          </h2>
          <h3 className="juujo-display text-xl md:text-2xl text-[var(--plum-soft)] italic mt-3">
            (Here is a comparison, but there is really no comparison)
          </h3>
        </div>

        <div className="mt-8 flex flex-col md:mt-12">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 rounded-t-2xl bg-[rgba(58,31,61,0.05)] md:left-1/3 md:w-1/6"
            />

            {/* Header Comp Row */}
            <div className="relative border-0">
            <div className="flex flex-col md:flex-row md:items-stretch">
              <div className="hidden md:block md:w-1/3"></div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center h-full">
                  <div className="-mb-px w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-0 md:mb-0 md:pb-2">
                    <img
                      src="/media/brand/juujo-logo.png"
                      alt="Juujo Logo"
                      className="h-8 md:h-10 w-auto object-contain max-w-[90%]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-1 md:pb-2">
                    <span className="juujo-display text-[var(--muted)] text-base md:text-lg font-bold leading-tight text-center">Terra</span>
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-1 md:pb-2">
                    <span className="juujo-display text-[var(--muted)] text-base md:text-lg font-bold leading-tight text-center">GroundingWell</span>
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pt-4 px-2 pb-1 md:pb-2">
                    <img
                      src="/media/competitors/getgrounding-logo.svg"
                      alt="Get Grounding"
                      className="h-6 md:h-8 w-auto object-contain max-w-[90%]"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Product Images Row */}
            <div className="relative border-b border-[rgba(194,188,177,0.4)]">
            <div className="flex flex-col md:flex-row md:items-stretch h-full">
              <div className="hidden md:block md:w-1/3"></div>
              <div className="w-full md:w-2/3">
                <div className="flex items-center h-full">
                  <div className="-mt-px w-1/4 flex justify-center items-center h-full pb-4 md:mt-0 md:pb-5 px-2 overflow-visible">
                    <img
                      src="/media/products/grounding-sheets/images/juujo-earthing-bed-sheet-visual.png"
                      alt="Juujo Sheet"
                      className="h-16 sm:h-20 md:h-24 w-auto object-cover rounded-lg shadow-sm"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pb-4 md:pb-5 px-2">
                    <img
                      src="/media/competitors/terra.png"
                      alt="Terra Grounding"
                      className="h-16 sm:h-20 md:h-24 w-auto object-cover rounded-lg shadow-sm"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pb-4 md:pb-5 px-2">
                    <img
                      src="/media/competitors/groundingwell.jpg"
                      alt="GroundingWell"
                      className="h-16 sm:h-20 md:h-24 w-auto object-cover rounded-lg shadow-sm"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-1/4 flex justify-center items-center h-full pb-4 md:pb-5 px-2">
                    <img
                      src="/media/competitors/getgrounding.webp"
                      alt="Get Grounding"
                      className="h-16 sm:h-20 md:h-24 w-auto object-cover rounded-lg shadow-sm"
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Features */}

          <ComparisonRow
            title="Deep Restorative Sleep"
            subtitle="Wake up refreshed and energized"
            values={[<CheckIcon key="1" />, <CheckIcon key="2" />, <CheckIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="High-Density Silver Grid"
            subtitle="Maximum conductivity and grounding effect"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Free Continuity Tester"
            subtitle="Verify your sheet is working anytime"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Antimicrobial Properties"
            subtitle="Stays fresh longer between washes"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />
          
          <ComparisonRow
            title="Machine Washable"
            subtitle="Durable and long-lasting"
            values={[<CheckIcon key="1" />, <CheckIcon key="2" />, <CheckIcon key="3" />, <CheckIcon key="4" />]}
          />

          <ComparisonRow
            title="App companion"
            subtitle="iPhone/Android"
            values={[<CheckIcon key="1" />, <CrossIcon key="2" />, <CrossIcon key="3" />, <CrossIcon key="4" />]}
          />

          <ComparisonRow
            title="Money-Back Guarantee"
            values={[
              <strong key="1" className="juujo-display font-bold text-sm md:text-base text-[var(--plum)]">120 DAYS</strong>,
              <strong key="2" className="juujo-display font-bold text-sm md:text-base text-[var(--muted)]">30 DAYS</strong>,
              <strong key="3" className="juujo-display font-bold text-sm md:text-base text-[var(--muted)]">90 DAYS</strong>,
              <strong key="4" className="juujo-display font-bold text-sm md:text-base text-[var(--muted)]">30 DAYS</strong>,
            ]}
            isLast={true}
          />
        </div>
      </div>
    </section>
  );
}
