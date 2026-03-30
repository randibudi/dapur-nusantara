export const formatPrice = (price: number): string => "Rp " + price.toLocaleString("id-ID")

export const formatPricePerPerson = (price: number): string => formatPrice(price) + "/org"
