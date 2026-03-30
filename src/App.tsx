import { useState } from "react"
import AddonGrid from "@/components/AddonGrid"
import BookingModal from "@/components/BookingModal"
import CartDrawer from "@/components/CartDrawer"
import Hero from "@/components/Hero"
import PackageGrid from "@/components/PackageGrid"
import TabNav from "@/components/TabNav"
import { useCart } from "@/context/CartContext"
import type { Addon, Package } from "@/types"

const App = () => {
  const [activeTab, setActiveTab] = useState("sepuasnya")
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const { addItem } = useCart()

  return (
    <main>
      <Hero />
      <div className="h-6" />
      <TabNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCartClick={() => setCartOpen(true)}
      />

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {(activeTab === "sepuasnya" || activeTab === "rame") && (
          <PackageGrid
            activeTab={activeTab}
            onPesan={(pkg: Package) => setSelectedPkg(pkg)}
            onTambah={(pkg: Package) => addItem(pkg)}
          />
        )}
        {activeTab === "tambahan" && <AddonGrid onTambah={(addon: Addon) => addItem(addon)} />}
      </div>

      <BookingModal
        pkg={selectedPkg}
        open={selectedPkg !== null}
        onClose={() => setSelectedPkg(null)}
      />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </main>
  )
}

export default App
