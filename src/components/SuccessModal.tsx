import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { formatPrice } from "@/utils/format"
import { buildWhatsAppMessage, openWhatsApp } from "@/utils/whatsapp"
import { CheckCircle2 } from "lucide-react"

interface SuccessModalProps {
  open: boolean
  onClose: () => void
  orderId: string
  name: string
  phone: string
  date: string
  time: string
  lines: string[]
  subtotal: number
  ppn: number
  serviceFee: number
  total: number
  note?: string
}

const SuccessModal = ({
  open,
  onClose,
  orderId,
  name,
  phone,
  date,
  time,
  lines,
  subtotal,
  ppn,
  serviceFee,
  total,
  note,
}: SuccessModalProps) => {
  const handleWhatsApp = () => {
    const message = buildWhatsAppMessage({
      orderId,
      name,
      date,
      time,
      lines,
      subtotal,
      ppn,
      serviceFee,
      total,
      note,
    })
    openWhatsApp(phone, message)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <CheckCircle2 className="h-14 w-14 text-green-500" />
          <div>
            <h2 className="text-lg font-bold text-[#111827]">Pesanan Diterima!</h2>
            <p className="mt-1 text-sm text-[#6B7280]">
              ID Pesanan: <span className="font-semibold text-[#111827]">{orderId}</span>
            </p>
          </div>

          <div className="w-full rounded-lg bg-[#F9FAFB] p-4 text-left text-sm">
            <p className="font-medium text-[#111827]">{name}</p>
            <p className="text-[#6B7280]">
              {date} · {time}
            </p>
            <div className="mt-2 space-y-0.5">
              {lines.map((line, i) => (
                <p key={i} className="text-[#6B7280]">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-3 border-t border-[#E5E7EB] pt-2 font-bold text-[#111827]">
              Total: <span className="text-[#DC2626]">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2">
            <Button
              className="w-full bg-[#25D366] text-white hover:bg-[#1ebe57]"
              onClick={handleWhatsApp}
            >
              Simpan ke WhatsApp
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Kembali ke Menu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessModal
