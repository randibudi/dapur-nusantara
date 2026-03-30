import { useState } from "react"
import Hero from "@/components/Hero"
import TabNav from "@/components/TabNav"

const App = () => {
  const [activeTab, setActiveTab] = useState("semua")

  return (
    <main>
      <Hero />
      <div className="h-6" />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab content placeholder — akan diisi di step selanjutnya */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <p className="text-sm text-[#6B7280]">
          Tab aktif: <span className="font-semibold text-[#111827]">{activeTab}</span>
        </p>
      </div>
    </main>
  )
}

export default App
