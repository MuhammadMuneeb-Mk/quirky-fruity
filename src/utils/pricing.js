export const DELIVERY_FEE = 250
export const FREE_DELIVERY_FROM = 2000

export function computeTotals(subtotal, fulfilment) {
  const delivery =
    fulfilment === 'delivery' && subtotal > 0 && subtotal < FREE_DELIVERY_FROM ? DELIVERY_FEE : 0
  return { subtotal, delivery, total: subtotal + delivery }
}
