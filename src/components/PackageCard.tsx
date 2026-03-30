import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Package } from "@/types"
import { formatPrice, formatPricePerPerson } from "@/utils/format"
import { Clock, TrendingUp, Users } from "lucide-react"

interface PackageCardProps {
  pkg: Package
  onPesan: (pkg: Package) => void
  onTambah: (pkg: Package) => void
}

const PackageCard = ({ pkg, onPesan, onTambah }: PackageCardProps) => {
  const isSepuasnya = pkg.type === "sepuasnya"
  const available = !pkg.soldOut

  return (
    <Card className="overflow-hidden border-[#E5E7EB] pt-0">
      {/* Image */}
      <div className="relative h-48 overflow-hidden sm:h-56">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {pkg.tags.map((tag) => (
          <Badge
            key={tag}
            className="absolute top-2 left-2 bg-[#F59E0B] text-white hover:bg-[#F59E0B]"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-[#111827]">{pkg.name}</h3>
          {isSepuasnya ? (
            <span className="mt-0.5 shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
              Booking Langsung
            </span>
          ) : (
            <span className="mt-0.5 shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-600">
              Via Keranjang
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-[#6B7280]">{pkg.description}</p>

        {/* Menu items */}
        <ul className="mt-3 space-y-1">
          {pkg.menuItems.map((item) => (
            <li key={item} className="text-sm text-[#6B7280]">
              • {item}
            </li>
          ))}
        </ul>

        {/* Info */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#6B7280]">
          {pkg.duration > 0 && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {pkg.duration} menit
            </span>
          )}
          {pkg.servesCount > 1 && (
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {pkg.servesCount} orang
            </span>
          )}
          <span className="inline-flex items-center">{pkg.availability}</span>
        </div>

        {/* Order count */}
        {pkg.orderCount && (
          <div className="mt-2">
            <span className="flex items-center gap-1 text-xs text-[#6B7280]">
              <TrendingUp className="h-3.5 w-3.5 text-[#F59E0B]" />
              Dipesan {pkg.orderCount}x bulan ini
            </span>
          </div>
        )}

        {/* Price + Action */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#DC2626]">
            {isSepuasnya ? formatPricePerPerson(pkg.price) : formatPrice(pkg.price)}
          </span>
          {isSepuasnya ? (
            <Button
              className={
                available
                  ? "bg-[#DC2626] hover:bg-[#B91C1C]"
                  : "cursor-default bg-gray-100 text-gray-400 hover:bg-gray-100"
              }
              disabled={!available}
              onClick={() => onPesan(pkg)}
            >
              {available ? "Pesan" : "Sudah Penuh"}
            </Button>
          ) : (
            <Button
              className={
                available
                  ? "bg-[#DC2626] hover:bg-[#B91C1C]"
                  : "cursor-default bg-gray-100 text-gray-400 hover:bg-gray-100"
              }
              disabled={!available}
              onClick={() => onTambah(pkg)}
            >
              {available ? "Tambah" : "Sudah Penuh"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PackageCard
