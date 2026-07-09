import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, X } from "lucide-react";

export function GroundingComparisonSection() {
  const comparisons = [
    {
      feature: "Deep Restorative Sleep",
      juujo: true,
      others: false,
    },
    {
      feature: "Neutralizes Free Radicals",
      juujo: true,
      others: false,
    },
    {
      feature: "Premium Organic Cotton",
      juujo: true,
      others: true,
    },
    {
      feature: "Conductive Silver Fibre",
      juujo: true,
      others: false,
    },
    {
      feature: "Easy Setup in 2 Minutes",
      juujo: true,
      others: false,
    },
  ];

  return (
    <section className="juujo-section bg-white py-7 md:py-12" id="comparison">
      <div className="juujo-wrap max-w-4xl">
        <SectionHeading
          eyebrow="Comparison"
          title={
            <>
              Why <em className="juujo-italic text-[var(--gold)]">Juujo</em>{" "}
              Stands Out
            </>
          }
          copy="See how our Grounding Sheet compares to ordinary bed sheets."
          align="center"
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="py-6 px-6 font-medium text-[var(--muted)] text-lg w-1/2 border-b border-[var(--border)]">
                  Feature
                </th>
                <th className="py-6 px-6 bg-[var(--cream)] rounded-t-2xl border-b border-[var(--border)] text-center w-1/4">
                  <span className="juujo-display text-2xl text-[var(--plum)]">
                    Juujo
                  </span>
                </th>
                <th className="py-6 px-6 font-medium text-[var(--muted)] text-lg text-center w-1/4 border-b border-[var(--border)]">
                  Regular Sheets
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-gray-50 transition-colors border-b border-[var(--border)]"
                >
                  <td className="py-6 px-6 text-[var(--plum)] font-medium text-lg">
                    {item.feature}
                  </td>
                  <td className="py-6 px-6 bg-[var(--cream)] text-center group-hover:bg-[#f3eadf] transition-colors">
                    <div className="flex justify-center">
                      {item.juujo ? (
                        <div className="bg-[var(--gold)]/20 text-[var(--gold)] rounded-full p-1">
                          <Check size={24} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="text-[var(--muted)]/50">
                          <X size={24} strokeWidth={2} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <div className="flex justify-center">
                      {item.others ? (
                        <div className="bg-gray-200 text-gray-500 rounded-full p-1">
                          <Check size={24} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="text-[var(--muted)]/50">
                          <X size={24} strokeWidth={2} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
