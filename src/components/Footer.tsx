const Footer = () => {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white py-4">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} Dapur Nusantara · Jl. Senopati No. 45, Jakarta Selatan ·
          (021) 7654-321
        </p>
      </div>
    </footer>
  )
}

export default Footer
