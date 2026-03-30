import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabNavProps {
  activeTab: string
  onTabChange: (value: string) => void
}

const tabs = [
  { value: "semua", label: "Semua" },
  { value: "sepuasnya", label: "Makan Sepuasnya" },
  { value: "rame", label: "Paket Rame" },
  { value: "tambahan", label: "Tambahan" },
  { value: "ulasan", label: "Ulasan" },
]

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="flex h-auto w-full gap-0 rounded-none border-b border-[#E5E7EB] bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 rounded-none border-b-2 border-transparent bg-transparent px-2 py-3 text-xs font-medium whitespace-nowrap text-[#6B7280] shadow-none transition-colors hover:bg-transparent hover:text-[#111827] focus-visible:ring-0 data-[state=active]:border-[#DC2626] data-[state=active]:bg-transparent data-[state=active]:text-[#DC2626] data-[state=active]:shadow-none sm:px-4 sm:text-sm"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </nav>
  )
}

export default TabNav
