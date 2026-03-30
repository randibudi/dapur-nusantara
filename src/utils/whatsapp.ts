export const isValidPhoneNumber = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, "")
  if (digits.length < 10 || digits.length > 15) return false
  if (digits.startsWith("62")) return digits.length >= 11 && digits.length <= 15
  if (digits.startsWith("0")) return digits.length >= 10 && digits.length <= 13
  return digits.length >= 9
}

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("62")) return digits
  if (digits.startsWith("0")) return "62" + digits.slice(1)
  return "62" + digits
}

export const buildWhatsAppMessage = (data: {
  orderId: string
  name: string
  date: string
  time: string
  lines: string[]
  subtotal: number
  ppn: number
  serviceFee: number
  total: number
  note?: string
}): string => {
  const { orderId, name, date, time, lines, subtotal, ppn, serviceFee, total, note } = data

  let message = `*Konfirmasi Pesanan Dapur Nusantara*\n\n`
  message += `ID Pesanan: *${orderId}*\n`
  message += `Nama: ${name}\n`
  message += `Tanggal: ${date}\n`
  message += `Waktu: ${time}\n\n`
  message += `Pesanan:\n${lines.join("\n")}\n\n`
  message += `Subtotal: Rp ${subtotal.toLocaleString("id-ID")}\n`
  message += `PPN 11%: Rp ${ppn.toLocaleString("id-ID")}\n`
  message += `Biaya Layanan 5%: Rp ${serviceFee.toLocaleString("id-ID")}\n`
  message += `Total: *Rp ${total.toLocaleString("id-ID")}*`
  if (note) message += `\n\nCatatan: ${note}`
  message += `\n\nSimpan pesan ini sebagai bukti pemesanan Anda.`

  return message
}

export const openWhatsApp = (phone: string, message: string): void => {
  const formatted = formatPhoneNumber(phone)
  window.open(`https://wa.me/${formatted}?text=${encodeURIComponent(message)}`, "_blank")
}
