import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { Package } from "@/types"
import { formatHarga } from "@/utils/format"
import { hitungLayanan, hitungPPN, hitungTotal } from "@/utils/price"
import { generateTimeSlots } from "@/utils/time"
import { Minus, Plus } from "lucide-react"

interface BookingModalProps {
  pkg: Package | null
  open: boolean
  onClose: () => void
}

const BookingModal = ({ pkg, open, onClose }: BookingModalProps) => {
  const [jumlahTamu, setJumlahTamu] = useState(1)
  const [tanggal, setTanggal] = useState("")
  const [waktu, setWaktu] = useState("")
  const [nama, setNama] = useState("")
  const [hp, setHp] = useState("")
  const [catatan, setCatatan] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!pkg) return null

  const subtotal = pkg.price * jumlahTamu
  const ppn = hitungPPN(subtotal)
  const layanan = hitungLayanan(subtotal)
  const total = hitungTotal(subtotal)

  const timeSlots = generateTimeSlots(pkg.timeSlot)
  const isValid = tanggal && waktu && nama.trim() && hp.trim()

  const handleConfirm = () => {
    setSubmitted(true)
    if (!isValid) return
    // TODO: buka SuccessModal (Step 11)
    console.log("Konfirmasi AYCE:", { pkg, jumlahTamu, tanggal, waktu, nama, hp, catatan })
  }

  const handleClose = () => {
    setJumlahTamu(1)
    setTanggal("")
    setWaktu("")
    setNama("")
    setHp("")
    setCatatan("")
    setSubmitted(false)
    onClose()
  }

  const fieldError = (val: string) =>
    submitted && !val.trim() ? "border-red-500 focus-visible:ring-red-500" : ""

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{pkg.name}</DialogTitle>
          <p className="text-sm text-[#6B7280]">
            {pkg.availability} · {pkg.duration} menit
          </p>
        </DialogHeader>

        <div className="space-y-5">
          {/* Jumlah Tamu */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#111827]">Jumlah Tamu</p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setJumlahTamu((v) => Math.max(1, v - 1))}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-5 text-center text-sm font-semibold">{jumlahTamu}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setJumlahTamu((v) => v + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Tanggal & Waktu */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#111827]">Tanggal</label>
              <Input
                type="date"
                value={tanggal}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setTanggal(e.target.value)}
                className={fieldError(tanggal)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#111827]">Waktu</label>
              <select
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring ${submitted && !waktu ? "border-red-500 focus:ring-red-500" : "border-input"}`}
              >
                <option value="">Pilih waktu</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Separator />

          {/* Rincian Harga */}
          <div className="space-y-2 text-sm">
            <p className="font-medium text-[#111827]">Rincian Harga</p>
            <div className="flex justify-between text-[#6B7280]">
              <span>
                {formatHarga(pkg.price)} × {jumlahTamu} orang
              </span>
              <span>{formatHarga(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>PPN 11%</span>
              <span>{formatHarga(ppn)}</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>Biaya Layanan 5%</span>
              <span>{formatHarga(layanan)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-[#111827]">
              <span>Total</span>
              <span className="text-[#DC2626]">{formatHarga(total)}</span>
            </div>
          </div>

          <Separator />

          {/* Data Pemesan */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#111827]">Data Pemesan</p>
            <div className="space-y-1.5">
              <label className="text-sm text-[#6B7280]">Nama</label>
              <Input
                placeholder="Nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className={fieldError(nama)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-[#6B7280]">Nomor HP</label>
              <Input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className={fieldError(hp)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-[#6B7280]">Catatan Khusus (opsional)</label>
              <Input
                placeholder="Alergi, permintaan tempat duduk, dll"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full bg-[#DC2626] hover:bg-[#B91C1C]"
            disabled={submitted && !isValid}
            onClick={handleConfirm}
          >
            Konfirmasi Pesanan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal
