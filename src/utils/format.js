const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (cents) => currency.format(cents / 100)

export const formatDate = (iso) =>
  new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
