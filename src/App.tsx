import { useState } from "react"
import AddonGrid from "@/components/AddonGrid"
import Hero from "@/components/Hero"
import PackageGrid from "@/components/PackageGrid"
import TabNav from "@/components/TabNav"
import type { Addon, Package } from "@/types"

const App = () => {
  const [activeTab, setActiveTab] = useState("semua")

  const handlePesan = (pkg: Package) => {
    // TODO: buka BookingModal (Step 8)
    console.log("Pesan:", pkg.name)
  }

  const handleTambahPaket = (pkg: Package) => {
    // TODO: tambah ke keranjang (Step 9)
    console.log("Tambah paket:", pkg.name)
  }

  const handleTambahAddon = (addon: Addon) => {
    // TODO: tambah ke keranjang (Step 9)
    console.log("Tambah addon:", addon.name)
  }

  return (
    <main>
      <Hero />
      <div className="h-6" />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {(activeTab === "semua" || activeTab === "sepuasnya" || activeTab === "rame") && (
          <PackageGrid activeTab={activeTab} onPesan={handlePesan} onTambah={handleTambahPaket} />
        )}
        {activeTab === "tambahan" && <AddonGrid onTambah={handleTambahAddon} />}
      </div>
    </main>
  )
}

export default App
