import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Star, Users } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="relative h-[300px] overflow-hidden sm:h-[400px]">
        <img
          src="/images/hero.webp"
          alt="Suasana restoran Dapur Nusantara dengan meja makan dan hidangan nusantara"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Restaurant Info */}
      <div className="relative mx-auto -mt-24 max-w-4xl px-4 sm:-mt-32 sm:px-6">
        <div className="rounded-xl bg-white p-6 shadow-lg sm:p-8">
          <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">Dapur Nusantara</h1>
          <p className="mt-1 text-[#6B7280]">Cita Rasa Nusantara, Harga Pasti, Tanpa Kejutan</p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-[#F59E0B]/10 px-3 py-1">
              <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-sm font-semibold text-[#F59E0B]">4.8</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-[#6B7280]">
              <Users className="h-4 w-4" />
              <span>12.500+ tamu puas</span>
            </div>
          </div>

          {/* Labels */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">Masakan Nusantara</Badge>
            <Badge variant="secondary">Halal</Badge>
            <Badge variant="secondary">Casual Fine</Badge>
            <Badge variant="secondary">Parkir Luas</Badge>
          </div>

          {/* Info */}
          <div className="mt-4 space-y-2 border-t border-[#E5E7EB] pt-4">
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <span>Setiap hari 11:00 - 22:00</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <MapPin className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <span>Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <Phone className="h-4 w-4 shrink-0 text-[#DC2626]" />
              <span>(021) 7654-321</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
