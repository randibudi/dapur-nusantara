import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { faqs } from "@/data/faqs"

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-xl font-bold text-[#111827]">Pertanyaan Umum</h2>
        <p className="mt-1 text-sm text-[#6B7280]">Ada yang ingin kamu tanyakan sebelum memesan?</p>

        <div className="mt-6 divide-y divide-[#E5E7EB] rounded-xl border border-[#E5E7EB]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-[#111827]">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[#6B7280] transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && <p className="px-5 pb-4 text-sm text-[#6B7280]">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
