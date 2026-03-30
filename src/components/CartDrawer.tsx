import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { ShoppingCart, X } from "lucide-react"
import CartItemRow from "./CartItemRow"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, totalItems, removeItem, updateQty } = useCart()

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
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
          <div className="flex-1 overflow-y-auto px-4">
            {items.map((cartItem) => (
              <CartItemRow
                key={cartItem.item.id}
                cartItem={cartItem}
                onUpdateQty={updateQty}
                onRemove={removeItem}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
