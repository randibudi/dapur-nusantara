import PackageCard from "@/components/PackageCard"
import { packages } from "@/data/packages"
import type { Package } from "@/types"

interface PackageGridProps {
  activeTab: string
  onPesan: (pkg: Package) => void
  onTambah: (pkg: Package) => void
}

const PackageGrid = ({ activeTab, onPesan, onTambah }: PackageGridProps) => {
  const filtered = packages.filter((pkg) => {
    if (activeTab === "semua") return true
    if (activeTab === "sepuasnya") return pkg.type === "sepuasnya"
    if (activeTab === "rame") return pkg.type === "rame"
    return false
  })

  if (filtered.length === 0) return null

  return (
    <section>
      {activeTab === "semua" && (
        <h2 className="mb-4 text-xl font-bold text-[#111827]">Pilihan Paket</h2>
      )}
      {activeTab === "sepuasnya" && (
        <h2 className="mb-4 text-xl font-bold text-[#111827]">Makan Sepuasnya</h2>
      )}
      {activeTab === "rame" && (
        <h2 className="mb-4 text-xl font-bold text-[#111827]">Paket Rame</h2>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} onPesan={onPesan} onTambah={onTambah} />
        ))}
      </div>
    </section>
  )
}

export default PackageGrid
