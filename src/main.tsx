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
          style: {
            background: "var(--destructive)",
            color: "white",
          },
        }}
      />
    </CartProvider>
  </StrictMode>,
)
