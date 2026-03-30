import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Addon } from "@/types"
import { formatHarga } from "@/utils/format"

interface AddonCardProps {
  addon: Addon
  onTambah: (addon: Addon) => void
}

const AddonCard = ({ addon, onTambah }: AddonCardProps) => {
  return (
    <Card className="border-[#E5E7EB]">
      <CardContent className="flex items-center gap-3 p-3">
        <img
          src={addon.image}
          alt={addon.name}
          className="h-16 w-16 shrink-0 rounded-md object-cover"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[#111827]">{addon.name}</h3>
          <p className="mt-0.5 text-xs text-[#6B7280]">{addon.description}</p>
          <span className="mt-1 block text-sm font-bold text-[#DC2626]">
            {formatHarga(addon.price)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/5"
          onClick={() => onTambah(addon)}
        >
          Tambah
        </Button>
      </CardContent>
    </Card>
  )
}

export default AddonCard
