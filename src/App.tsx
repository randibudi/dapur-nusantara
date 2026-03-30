import { useState } from "react"
import Hero from "@/components/Hero"
import PackageGrid from "@/components/PackageGrid"
import TabNav from "@/components/TabNav"
import type { Package } from "@/types"

const App = () => {
  const [activeTab, setActiveTab] = useState("semua")

  const handlePesan = (pkg: Package) => {
    // TODO: buka BookingModal (Step 8)
    console.log("Pesan:", pkg.name)
  }

  const handleTambah = (pkg: Package) => {
    // TODO: tambah ke keranjang (Step 9)
    console.log("Tambah:", pkg.name)
  }

  return (
    <main>
      <Hero />
      <div className="h-6" />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {(activeTab === "semua" || activeTab === "sepuasnya" || activeTab === "rame") && (
          <PackageGrid activeTab={activeTab} onPesan={handlePesan} onTambah={handleTambah} />
        )}
      </div>
    </main>
  )
}

export default App
