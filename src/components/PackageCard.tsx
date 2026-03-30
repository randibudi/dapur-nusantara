import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Package } from "@/types"
import { formatPrice, formatPricePerPerson } from "@/utils/format"
import { Clock, Users } from "lucide-react"

interface PackageCardProps {
  pkg: Package
  onPesan: (pkg: Package) => void
  onTambah: (pkg: Package) => void
}

const PackageCard = ({ pkg, onPesan, onTambah }: PackageCardProps) => {
  const isSepuasnya = pkg.type === "sepuasnya"

  return (
    <Card className="overflow-hidden border-[#E5E7EB] pt-0">
      {/* Image */}
      <div className="relative h-48 overflow-hidden sm:h-56">
        <img src={pkg.image} alt={pkg.name} className="h-full w-full object-cover" />
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
        <h3 className="text-lg font-bold text-[#111827]">{pkg.name}</h3>
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
          <span>{pkg.availability}</span>
        </div>

        {/* Price + Action */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#DC2626]">
            {isSepuasnya ? formatPricePerPerson(pkg.price) : formatPrice(pkg.price)}
          </span>
          {isSepuasnya ? (
            <Button className="bg-[#DC2626] hover:bg-[#B91C1C]" onClick={() => onPesan(pkg)}>
              Pesan
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626]/5"
              onClick={() => onTambah(pkg)}
            >
              Tambah
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PackageCard
