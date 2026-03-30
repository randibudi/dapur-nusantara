import { calculatePPN, calculateServiceFee, calculateSubtotal, calculateTotal } from "@/utils/price"
import type { CartItem } from "@/types"

const makeItem = (id: string, price: number, quantity: number): CartItem => ({
  item: {
    id,
    name: "",
    type: "rame",
    price,
    servesCount: 1,
    image: "",
    description: "",
    menuItems: [],
    tags: [],
    availability: "",
    timeSlot: "",
    duration: 0,
  },
  quantity,
})

describe("calculateSubtotal", () => {
  it("returns 0 for empty cart", () => {
    expect(calculateSubtotal([])).toBe(0)
  })

  it("calculates single item", () => {
    expect(calculateSubtotal([makeItem("a", 350000, 1)])).toBe(350000)
  })

  it("multiplies price by quantity", () => {
    expect(calculateSubtotal([makeItem("a", 350000, 2)])).toBe(700000)
  })

  it("sums multiple items", () => {
    const items = [makeItem("a", 350000, 1), makeItem("b", 8000, 3)]
    expect(calculateSubtotal(items)).toBe(374000)
  })
})

describe("calculatePPN", () => {
  it("calculates 11% tax", () => {
    expect(calculatePPN(100000)).toBe(11000)
  })

  it("rounds the result", () => {
    expect(calculatePPN(350000)).toBe(Math.round(350000 * 0.11))
  })
})

describe("calculateServiceFee", () => {
  it("calculates 5% service fee", () => {
    expect(calculateServiceFee(100000)).toBe(5000)
  })

  it("rounds the result", () => {
    expect(calculateServiceFee(350000)).toBe(Math.round(350000 * 0.05))
  })
})

describe("calculateTotal", () => {
  it("adds subtotal + ppn + service fee", () => {
    const subtotal = 100000
    expect(calculateTotal(subtotal)).toBe(116000)
  })

  it("matches manual calculation", () => {
    const subtotal = 350000
    const expected = subtotal + Math.round(subtotal * 0.11) + Math.round(subtotal * 0.05)
    expect(calculateTotal(subtotal)).toBe(expected)
  })
})
