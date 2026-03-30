import { buildWhatsAppMessage, formatPhoneNumber, isValidPhoneNumber } from "@/utils/whatsapp"

describe("isValidPhoneNumber", () => {
  it("accepts format 08xx", () => {
    expect(isValidPhoneNumber("08123456789")).toBe(true)
  })

  it("accepts format 628xx", () => {
    expect(isValidPhoneNumber("628123456789")).toBe(true)
  })

  it("rejects too short number", () => {
    expect(isValidPhoneNumber("0812")).toBe(false)
  })

  it("rejects empty string", () => {
    expect(isValidPhoneNumber("")).toBe(false)
  })

  it("ignores non-digit characters", () => {
    expect(isValidPhoneNumber("0812-3456-789")).toBe(true)
  })
})

describe("formatPhoneNumber", () => {
  it("converts 08xx to 628xx", () => {
    expect(formatPhoneNumber("08123456789")).toBe("628123456789")
  })

  it("keeps 628xx as-is", () => {
    expect(formatPhoneNumber("628123456789")).toBe("628123456789")
  })

  it("prepends 62 to number without leading 0", () => {
    expect(formatPhoneNumber("8123456789")).toBe("628123456789")
  })
})

describe("buildWhatsAppMessage", () => {
  const baseData = {
    orderId: "#PKT-12345",
    name: "Budi Santoso",
    date: "2026-04-01",
    time: "12:00",
    lines: ["Paket Keluarga × 1"],
    subtotal: 350000,
    ppn: 38500,
    serviceFee: 17500,
    total: 406000,
  }

  it("contains order ID", () => {
    expect(buildWhatsAppMessage(baseData)).toContain("#PKT-12345")
  })

  it("contains customer name", () => {
    expect(buildWhatsAppMessage(baseData)).toContain("Budi Santoso")
  })

  it("contains order lines", () => {
    expect(buildWhatsAppMessage(baseData)).toContain("Paket Keluarga × 1")
  })

  it("contains total amount", () => {
    expect(buildWhatsAppMessage(baseData)).toContain("406.000")
  })

  it("includes note when provided", () => {
    const msg = buildWhatsAppMessage({ ...baseData, note: "Meja pojok" })
    expect(msg).toContain("Meja pojok")
  })

  it("omits note section when not provided", () => {
    const msg = buildWhatsAppMessage(baseData)
    expect(msg).not.toContain("Catatan:")
  })
})
