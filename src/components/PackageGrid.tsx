import PackageCard from "@/components/PackageCard"
import { packages } from "@/data/packages"
import type { Package } from "@/types"
import { CalendarCheck, ShoppingCart } from "lucide-react"

interface PackageGridProps {
  activeTab: "sepuasnya" | "rame"
  onPesan: (pkg: Package) => void
  onTambah: (pkg: Package) => void
}

const headings = {
  sepuasnya: { title: "Makan Sepuasnya", sub: "Harga per orang" },
  rame: { title: "Paket Rame", sub: "Harga per paket" },
}

const PackageGrid = ({ activeTab, onPesan, onTambah }: PackageGridProps) => {
  const items = packages.filter((pkg) => pkg.type === activeTab)
  const { title, sub } = headings[activeTab]

  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-[#111827]">{title}</h2>
      <p className="mb-4 text-sm text-[#6B7280]">{sub}</p>

      {activeTab === "sepuasnya" ? (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
          <div>
            <p className="text-sm font-semibold text-blue-800">Booking Langsung</p>
            <p className="mt-0.5 text-sm text-blue-700">
              Pilih paket → isi jumlah tamu, tanggal & waktu → konfirmasi. Tidak perlu keranjang.
            </p>
          </div>
        </div>
      ) : (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
          <ShoppingCart className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div>
            <p className="text-sm font-semibold text-orange-800">Pesan via Keranjang</p>
            <p className="mt-0.5 text-sm text-orange-700">
              Pilih paket & tambahan sesukamu → buka keranjang → checkout sekalian.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onPesan={onPesan} onTambah={onTambah} />
        ))}
      </div>
    </section>
  )
}

export default PackageGrid
