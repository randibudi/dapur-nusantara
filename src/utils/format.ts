export const formatHarga = (price: number) => "Rp " + price.toLocaleString("id-ID")

export const formatHargaPerOrang = (price: number) => formatHarga(price) + "/org"
