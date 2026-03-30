import type { CartItem } from "@/types"

export const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0)

export const calculatePPN = (subtotal: number): number => Math.round(subtotal * 0.11)

export const calculateServiceFee = (subtotal: number): number => Math.round(subtotal * 0.05)

export const calculateTotal = (subtotal: number): number =>
  subtotal + calculatePPN(subtotal) + calculateServiceFee(subtotal)
