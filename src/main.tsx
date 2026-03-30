import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "sonner"
import "./index.css"
import App from "./App.tsx"
import { CartProvider } from "@/context/CartContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "var(--destructive)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 4px 16px rgba(185, 28, 28, 0.45)",
          },
        }}
      />
    </CartProvider>
  </StrictMode>,
)
