import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { Package } from "@/types"
import { formatPrice } from "@/utils/format"
import { calculateServiceFee, calculatePPN, calculateTotal } from "@/utils/price"
import { generateTimeSlots } from "@/utils/time"
import { Minus, Plus } from "lucide-react"
import SuccessModal from "@/components/SuccessModal"
import { isValidPhoneNumber } from "@/utils/whatsapp"

interface BookingModalProps {
  pkg: Package | null
  open: boolean
  onClose: () => void
}

const BookingModal = ({ pkg, open, onClose }: BookingModalProps) => {
  const [guestCount, setGuestCount] = useState(1)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [orderId, setOrderId] = useState("")

  if (!pkg) return null

  const subtotal = pkg.price * guestCount
  const ppn = calculatePPN(subtotal)
  const serviceFee = calculateServiceFee(subtotal)
  const total = calculateTotal(subtotal)

  const timeSlots = generateTimeSlots(pkg.timeSlot)
  const isPhoneValid = isValidPhoneNumber(phone)
  const isValid = date && time && name.trim() && phone.trim() && isPhoneValid

  const handleConfirm = () => {
    setSubmitted(true)
    if (!isValid) return
    const id = `#AYCE-${Math.floor(10000 + Math.random() * 90000)}`
    setOrderId(id)
    setSuccessOpen(true)
  }

  const handleClose = () => {
    setGuestCount(1)
    setDate("")
    setTime("")
    setName("")
    setPhone("")
    setNote("")
    setSubmitted(false)
    setSuccessOpen(false)
    onClose()
  }

  const fieldError = (val: string) =>
    submitted && !val.trim() ? "border-red-500 focus-visible:ring-red-500" : ""

  return (
    <>
      <SuccessModal
        open={successOpen}
        onClose={handleClose}
        orderId={orderId}
        name={name}
        phone={phone}
        date={date}
        time={time}
        lines={[`${pkg.name} × ${guestCount} orang`]}
        subtotal={subtotal}
        ppn={ppn}
        serviceFee={serviceFee}
        total={total}
        note={note}
      />
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
                  onClick={() => setGuestCount((v) => Math.max(1, v - 1))}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="w-5 text-center text-sm font-semibold">{guestCount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setGuestCount((v) => v + 1)}
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
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className={fieldError(date)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-[#111827]">Waktu</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`focus:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none ${submitted && !time ? "border-red-500 focus:ring-red-500" : "border-input"}`}
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
                  {formatPrice(pkg.price)} × {guestCount} orang
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>PPN 11%</span>
                <span>{formatPrice(ppn)}</span>
              </div>
              <div className="flex justify-between text-[#6B7280]">
                <span>Biaya Layanan 5%</span>
                <span>{formatPrice(serviceFee)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-[#111827]">
                <span>Total</span>
                <span className="text-[#DC2626]">{formatPrice(total)}</span>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldError(name)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-[#6B7280]">Nomor HP</label>
                <Input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldError(phone)}
                />
                {submitted && phone && !isPhoneValid && (
                  <p className="text-xs text-red-500">Format nomor tidak valid</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-[#6B7280]">Catatan Khusus (opsional)</label>
                <Input
                  placeholder="Alergi, permintaan tempat duduk, dll"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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
    </>
  )
}

export default BookingModal
