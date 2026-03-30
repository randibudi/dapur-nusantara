import { addons } from "@/data/addons"
import type { Addon } from "@/types"
import AddonCard from "@/components/AddonCard"

interface AddonGridProps {
  onTambah: (addon: Addon) => void
}

const AddonGrid = ({ onTambah }: AddonGridProps) => {
  const minuman = addons.filter((a) => a.category === "minuman")
  const camilan = addons.filter((a) => a.category === "camilan")

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-bold text-[#111827]">Minuman</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {minuman.map((addon) => (
            <AddonCard key={addon.id} addon={addon} onTambah={onTambah} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-[#111827]">Camilan</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {camilan.map((addon) => (
            <AddonCard key={addon.id} addon={addon} onTambah={onTambah} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default AddonGrid
