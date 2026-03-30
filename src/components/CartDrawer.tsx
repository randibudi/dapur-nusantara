import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/utils/format"
import { calculateServiceFee, calculatePPN, calculateSubtotal, calculateTotal } from "@/utils/price"
import { generateTimeSlots } from "@/utils/time"
import { ShoppingCart, X } from "lucide-react"
import CartItemRow from "@/components/CartItemRow"
import SuccessModal from "@/components/SuccessModal"
import { isValidPhoneNumber } from "@/utils/whatsapp"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

const TIME_SLOTS = generateTimeSlots("11:00-22:00")

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, totalItems, removeItem, updateQty, clearCart } = useCart()

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [note, setNote] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [orderId, setOrderId] = useState("")

  const subtotal = calculateSubtotal(items)
  const ppn = calculatePPN(subtotal)
  const serviceFee = calculateServiceFee(subtotal)
  const total = calculateTotal(subtotal)

  const isPhoneValid = isValidPhoneNumber(phone)
  const isFormValid = !!(date && time && name.trim() && phone.trim() && isPhoneValid)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleSuccessClose = () => {
    setSuccessOpen(false)
    clearCart()
    setDate("")
    setTime("")
    setName("")
    setPhone("")
    setNote("")
    setSubmitted(false)
    onClose()
  }

  return (
    <>
      <SuccessModal
        open={successOpen}
        onClose={handleSuccessClose}
        orderId={orderId}
        name={name}
        phone={phone}
        date={date}
        time={time}
        lines={items.map(({ item, quantity }) => `${item.name} × ${quantity}`)}
        subtotal={subtotal}
        ppn={ppn}
        serviceFee={serviceFee}
        total={total}
        note={note}
      />
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer — full screen mobile, right panel desktop */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out sm:inset-y-0 sm:right-0 sm:left-auto sm:w-96 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang belanja"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-4">
          <h2 className="text-base font-semibold text-[#111827]">
            Keranjang {totalItems > 0 && `(${totalItems})`}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#6B7280] hover:text-[#111827]"
            aria-label="Tutup keranjang"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <ShoppingCart className="h-12 w-12 text-[#E5E7EB]" />
            <div>
              <p className="font-semibold text-[#111827]">Keranjang masih kosong</p>
              <p className="mt-1 text-sm text-[#6B7280]">Tambahkan paket atau minuman & camilan</p>
            </div>
            <Button variant="outline" className="border-[#DC2626] text-[#DC2626]" onClick={onClose}>
              Lihat Menu
            </Button>
          </div>
        ) : (
          <>
            {/* Scrollable: item list + booking form */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4">
                {items.map((cartItem) => (
                  <CartItemRow
                    key={cartItem.item.id}
                    cartItem={cartItem}
                    onUpdateQty={updateQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              {/* Booking form */}
              <div className="border-t border-[#E5E7EB] px-4 pt-4 pb-2">
                <h3 className="mb-3 text-sm font-semibold text-[#111827]">Detail Pemesanan</h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-xs text-[#6B7280]">Tanggal</label>
                      <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className={submitted && !date ? "border-red-500" : ""}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-[#6B7280]">Waktu</label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={`h-10 w-full rounded-md border px-3 text-sm focus:outline-none ${
                          submitted && !time ? "border-red-500" : "border-[#E5E7EB]"
                        }`}
                      >
                        <option value="">Pilih waktu</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6B7280]">Nama Lengkap</label>
                    <Input
                      placeholder="Nama pemesan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={submitted && !name ? "border-red-500" : ""}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6B7280]">Nomor HP</label>
                    <Input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={submitted && !phone ? "border-red-500" : ""}
                    />
                    {submitted && phone && !isPhoneValid && (
                      <p className="text-xs text-red-500">Format nomor tidak valid</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-[#6B7280]">Catatan (opsional)</label>
                    <Input
                      placeholder="Alergi, permintaan khusus, dll"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed bottom: price breakdown + CTA */}
            <div className="border-t border-[#E5E7EB] px-4 py-4">
              <div className="mb-3 space-y-1 text-sm">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>PPN 11%</span>
                  <span>{formatPrice(ppn)}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Layanan 5%</span>
                  <span>{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between border-t border-[#E5E7EB] pt-2 font-bold text-[#111827]">
                  <span>Total</span>
                  <span className="text-[#DC2626]">{formatPrice(total)}</span>
                </div>
              </div>
              <Button
                className="w-full bg-[#DC2626] text-white hover:bg-[#B91C1C] disabled:opacity-50"
                disabled={submitted && !isFormValid}
                onClick={() => {
                  setSubmitted(true)
                  if (!isFormValid || !isPhoneValid) return
                  const id = `#PKT-${Math.floor(10000 + Math.random() * 90000)}`
                  setOrderId(id)
                  setSuccessOpen(true)
                }}
              >
                Pesan Sekarang
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CartDrawer
