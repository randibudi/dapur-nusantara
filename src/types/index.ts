export type PackageType = "sepuasnya" | "rame"

export interface Package {
  id: string
  name: string
  type: PackageType
  price: number
  priceLabel: string
  servesCount: number
  image: string
  description: string
  menuItems: string[]
  tags: string[]
  availability: string
  timeSlot: string
  duration: number
}

export interface Addon {
  id: string
  name: string
  category: "minuman" | "camilan"
  price: number
  description: string
}

export interface CartItem {
  item: Package | Addon
  quantity: number
}

export interface BookingState {
  items: CartItem[]
  adults: number
  kids: number
  date: string
  time: string
  customerName: string
  customerPhone: string
  specialRequest: string
}

export interface Review {
  id: string
  name: string
  rating: number
  date: string
  comment: string
  packageName: string
}

export interface PriceBreakdown {
  subtotal: number
  tax: number
  service: number
  total: number
}
