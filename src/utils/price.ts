import type { CartItem } from "@/types"

export const hitungSubtotal = (items: CartItem[]) =>
  items.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0)

export const hitungPPN = (subtotal: number) => Math.round(subtotal * 0.11)

export const hitungLayanan = (subtotal: number) => Math.round(subtotal * 0.05)

export const hitungTotal = (subtotal: number) =>
  subtotal + hitungPPN(subtotal) + hitungLayanan(subtotal)
