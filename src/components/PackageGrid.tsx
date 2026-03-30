import PackageCard from "@/components/PackageCard"
import { packages } from "@/data/packages"
import type { Package } from "@/types"

interface PackageGridProps {
  activeTab: "sepuasnya" | "rame"
  onPesan: (pkg: Package) => void
  onTambah: (pkg: Package) => void
}

const headings = {
  sepuasnya: { title: "Makan Sepuasnya", sub: "Pesan langsung · harga per orang" },
  rame: { title: "Paket Rame", sub: "Tambah ke keranjang · harga per paket" },
}

const PackageGrid = ({ activeTab, onPesan, onTambah }: PackageGridProps) => {
  const items = packages.filter((pkg) => pkg.type === activeTab)
  const { title, sub } = headings[activeTab]

  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-[#111827]">{title}</h2>
      <p className="mb-4 text-sm text-[#6B7280]">{sub}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onPesan={onPesan} onTambah={onTambah} />
        ))}
      </div>
    </section>
  )
}

export default PackageGrid
