import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/types"
import { formatHarga } from "@/utils/format"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemRowProps {
  cartItem: CartItem
  onUpdateQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
}

const CartItemRow = ({ cartItem, onUpdateQty, onRemove }: CartItemRowProps) => {
  const { item, quantity } = cartItem

  return (
    <div>
      <div className="flex items-center gap-3 py-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#111827]">{item.name}</p>
          <p className="text-xs text-[#6B7280]">{formatHarga(item.price)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() =>
              quantity === 1 ? onRemove(item.id) : onUpdateQty(item.id, quantity - 1)
            }
          >
            {quantity === 1 ? <Trash2 className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
          </Button>
          <span className="w-5 text-center text-sm font-semibold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdateQty(item.id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <p className="shrink-0 text-right text-sm font-bold text-[#DC2626]">
          {formatHarga(item.price * quantity)}
        </p>
      </div>
      <Separator />
    </div>
  )
}

export default CartItemRow
