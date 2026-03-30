import { createContext, useContext, useReducer } from "react"
import type { Addon, CartItem, Package } from "@/types"

type Action =
  | { type: "ADD_ITEM"; item: Package | Addon }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QTY"; id: string; quantity: number }
  | { type: "CLEAR_CART" }

interface CartState {
  items: CartItem[]
}

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((ci) => ci.item.id === action.item.id)
      if (exists) {
        return {
          items: state.items.map((ci) =>
            ci.item.id === action.item.id ? { ...ci, quantity: ci.quantity + 1 } : ci,
          ),
        }
      }
      return { items: [...state.items, { item: action.item, quantity: 1 }] }
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((ci) => ci.item.id !== action.id) }
    case "UPDATE_QTY":
      return {
        items: state.items.map((ci) =>
          ci.item.id === action.id ? { ...ci, quantity: action.quantity } : ci,
        ),
      }
    case "CLEAR_CART":
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  addItem: (item: Package | Addon) => void
  removeItem: (id: string) => void
  updateQty: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const totalItems = state.items.reduce((acc, ci) => acc + ci.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        updateQty: (id, quantity) => dispatch({ type: "UPDATE_QTY", id, quantity }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
