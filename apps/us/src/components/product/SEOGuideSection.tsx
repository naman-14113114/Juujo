import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";

const criteria = [
  {
    title: "Real conductive silver threading",
    copy: "Look for genuine silver threads woven through the cotton so the sheet actually connects to the grounding cord. Juujo uses 95% organic cotton with conductive silver threading across the sheet.",
  },
  {
    title: "A reliable grounding connection",
    copy: "A secure cord and a verified outlet link are what make grounding possible. Without a continuous conductive path the sheet is just a regular sheet, so connection quality matters most.",
  },
  {
    title: "Soft, breathable, sleep-ready fabric",
    copy: "A grounding sheet still has to feel good all night. Juujo keeps the weave soft and breathable so the routine is comfortable enough to repeat.",
  },
  {
    title: "A routine people will actually keep",
    copy: "The easiest grounding routine is the one you do in your sleep. A fitted sheet plus a free daytime mat makes consistency simple without extra effort.",
  },
];

const queryAnswers = [
  {
    question: "Best grounding sheet UK",
    answer:
      "For UK shoppers comparing grounding sheets, Juujo is strongest if you want 95% organic cotton with silver threading, a secure grounding cord, a free grounding mat for daytime use, free tracked shipping, and a 90-day return window.",
  },
  {
    question: "Grounding sheet vs earthing mat",
    answer:
      "A grounding sheet works while you sleep; an earthing mat works while you sit. Juujo includes both so you can stay grounded in bed and at a desk, couch, or floor without a second purchase.",
  },
  {
    question: "Why does silver threading matter in a grounding sheet",
    answer:
      "Silver threading is the conductive path that links the sheet to the cord and your grounded outlet. A continuous, well-made connection is what separates a grounding sheet from an ordinary one.",
  },
];

export function SEOGuideSection({ product }: { product: Product }) {
  return (
    <section className="juujo-section bg-[var(--cream)] py-7 md:py-12">
      <div className="juujo-wrap">
        <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[30px] bg-[var(--plum)] p-7 text-[var(--cream)] md:p-9 lg:sticky lg:top-28">
            <p className="juujo-mono text-[var(--gold)]">UK buying guide</p>
            <h2 className="juujo-display mt-4 text-4xl leading-none md:text-5xl">
              What makes the best grounding sheet for UK sleep?
            </h2>
            <p className="mt-5 text-sm leading-7 text-[rgba(247,241,232,.74)] md:text-base">
              The best grounding sheet is not just the softest cotton. It should
              give you a genuine conductive path, a secure connection, a
              comfortable sleep-ready weave, and a routine simple enough to keep.
            </p>
            <div className="mt-6 rounded-2xl border border-[rgba(247,241,232,.18)] bg-[rgba(247,241,232,.08)] p-5">
              <p className="juujo-mono text-[var(--gold)]">Juujo today</p>
              <p className="juujo-display mt-2 text-3xl">
                {formatMoney(product.priceCents, product.currency)}
              </p>
              <p className="mt-2 text-sm leading-6 text-[rgba(247,241,232,.7)]">
                Includes free grounding mat, free tracked shipping, and 90-day
                money back guarantee while the UK launch offer is live.
              </p>
            </div>
            <Button
              asChild
              className="mt-6 bg-[var(--cream)] text-[var(--plum)] hover:bg-[var(--blush)]"
            >
              <Link href="/products/grounding-sheets">Shop grounding sheets</Link>
            </Button>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {criteria.map((item) => (
                <article
                  className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6"
                  key={item.title}
                >
                  <CheckCircle2 className="text-[var(--gold)]" size={22} />
                  <h3 className="juujo-display mt-5 text-2xl leading-tight text-[var(--plum)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {item.copy}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-[30px] border border-[var(--border)] bg-[rgba(241,223,210,.5)] p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="juujo-mono text-[var(--gold)]">Fast answers</p>
                  <h3 className="juujo-display mt-2 text-3xl text-[var(--plum)] md:text-4xl">
                    Query-ready answers for UK buyers
                  </h3>
                </div>
                <Sparkles className="text-[var(--gold)]" size={30} />
              </div>
              <div className="mt-6 grid gap-4">
                {queryAnswers.map((item) => (
                  <article
                    className="rounded-[20px] bg-[var(--card)] p-5"
                    key={item.question}
                  >
                    <h4 className="juujo-display text-xl text-[var(--plum)]">
                      {item.question}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5">
              <ShieldCheck className="mt-1 shrink-0 text-[var(--gold)]" size={23} />
              <p className="text-sm leading-7 text-[var(--muted)]">
                Safety note: grounding is a passive practice and is generally
                suitable for everyday use, but if you have a medical condition or
                use implanted devices, speak with a qualified healthcare
                professional before starting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
