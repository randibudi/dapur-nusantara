import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PackageCard from "@/components/PackageCard"
import type { Package } from "@/types"

const paketKeluarga: Package = {
  id: "paket-keluarga",
  name: "Paket Keluarga",
  type: "rame",
  price: 350000,
  servesCount: 4,
  image: "/images/paket-keluarga.webp",
  description: "Paket lengkap untuk keluarga.",
  menuItems: ["Nasi putih", "Rendang sapi"],
  tags: ["4 Orang", "Terlaris"],
  availability: "Setiap hari",
  timeSlot: "11:00-22:00",
  duration: 0,
  orderCount: 423,
}

const prasmananSiang: Package = {
  id: "prasmanan-siang",
  name: "Prasmanan Siang",
  type: "sepuasnya",
  price: 168000,
  servesCount: 1,
  image: "/images/prasmanan-siang.webp",
  description: "Prasmanan siang lengkap.",
  menuItems: ["Aneka lauk nusantara"],
  tags: ["Senin - Jumat"],
  availability: "Sen-Jum 11:00-15:00",
  timeSlot: "11:00-15:00",
  duration: 90,
  orderCount: 312,
}

describe("PackageCard", () => {
  const onPesan = vi.fn()
  const onTambah = vi.fn()

  afterEach(() => vi.clearAllMocks())

  it("renders package name and price", () => {
    render(<PackageCard pkg={paketKeluarga} onPesan={onPesan} onTambah={onTambah} />)
    expect(screen.getByText("Paket Keluarga")).toBeInTheDocument()
    expect(screen.getByText("Rp 350.000")).toBeInTheDocument()
  })

  it("shows Tambah button for paket rame", () => {
    render(<PackageCard pkg={paketKeluarga} onPesan={onPesan} onTambah={onTambah} />)
    expect(screen.getByRole("button", { name: "Tambah" })).toBeInTheDocument()
  })

  it("shows Pesan button for sepuasnya", () => {
    render(<PackageCard pkg={prasmananSiang} onPesan={onPesan} onTambah={onTambah} />)
    expect(screen.getByRole("button", { name: "Pesan" })).toBeInTheDocument()
  })

  it("calls onTambah when Tambah clicked", async () => {
    render(<PackageCard pkg={paketKeluarga} onPesan={onPesan} onTambah={onTambah} />)
    await userEvent.click(screen.getByRole("button", { name: "Tambah" }))
    expect(onTambah).toHaveBeenCalledWith(paketKeluarga)
  })

  it("calls onPesan when Pesan clicked", async () => {
    render(<PackageCard pkg={prasmananSiang} onPesan={onPesan} onTambah={onTambah} />)
    await userEvent.click(screen.getByRole("button", { name: "Pesan" }))
    expect(onPesan).toHaveBeenCalledWith(prasmananSiang)
  })

  it("shows Sudah Penuh and disables button when soldOut", () => {
    const soldOut = { ...paketKeluarga, soldOut: true }
    render(<PackageCard pkg={soldOut} onPesan={onPesan} onTambah={onTambah} />)
    const btn = screen.getByRole("button", { name: "Sudah Penuh" })
    expect(btn).toBeDisabled()
  })

  it("shows order count when provided", () => {
    render(<PackageCard pkg={paketKeluarga} onPesan={onPesan} onTambah={onTambah} />)
    expect(screen.getByText(/Dipesan 423x/)).toBeInTheDocument()
  })
})
