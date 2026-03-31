import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/CartContext"
import { ShoppingCart } from "lucide-react"

interface TabNavProps {
  activeTab: string
  onTabChange: (value: string) => void
  onCartClick: () => void
}

const tabs = [
  { value: "sepuasnya", label: "Sepuasnya", labelDesktop: "Makan Sepuasnya" },
  { value: "rame", label: "Paket Rame", labelDesktop: "Paket Rame" },
  { value: "tambahan", label: "Tambahan", labelDesktop: "Tambahan" },
]

const TabNav = ({ activeTab, onTabChange, onCartClick }: TabNavProps) => {
  const { totalItems } = useCart()

  return (
    <nav className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white">
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-2 px-4 sm:h-16 sm:px-6">
        <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="flex h-auto w-max items-center gap-1 rounded-none bg-transparent p-0 sm:w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-[#6B7280] shadow-none transition-colors hover:bg-[#F3F4F6] hover:text-[#111827] focus-visible:ring-0 data-[state=active]:bg-[#DC2626] data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  <span className="sm:hidden">{tab.label}</span>
                  <span className="hidden sm:inline">{tab.labelDesktop}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="shrink-0 border-l border-[#E5E7EB] pl-3">
          <button
            onClick={onCartClick}
            className="relative rounded-md p-2 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#111827]"
            aria-label="Buka keranjang"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TabNav
