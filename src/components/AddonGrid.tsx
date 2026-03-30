import { addons } from "@/data/addons"
import type { Addon } from "@/types"
import AddonCard from "@/components/AddonCard"
import { ShoppingCart } from "lucide-react"

interface AddonGridProps {
  onTambah: (addon: Addon) => void
}

const AddonGrid = ({ onTambah }: AddonGridProps) => {
  const minuman = addons.filter((a) => a.category === "minuman")
  const camilan = addons.filter((a) => a.category === "camilan")

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
        <ShoppingCart className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
        <div>
          <p className="text-sm font-semibold text-orange-800">Pesan via Keranjang</p>
          <p className="mt-0.5 text-sm text-orange-700">
            Tambahan bisa dicampur dengan Paket Rame dalam 1 keranjang. Checkout sekalian.
          </p>
        </div>
      </div>

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
