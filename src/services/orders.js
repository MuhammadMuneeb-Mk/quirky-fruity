import { readJSON, writeJSON } from '../utils/storage'

// fake orders API using localStorage (no backend yet)
const STORAGE_KEY = 'qf-orders'
const LATENCY_MS = 900

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const makeOrderId = () => {
  const stamp = Date.now().toString(36).slice(-4).toUpperCase()
  const rand = Math.floor(Math.random() * 900 + 100)
  return `QF-${stamp}${rand}`
}

export async function placeOrder({ lines, customer, fulfilment, payment, totals }) {
  await wait(LATENCY_MS)

  if (!lines.length) throw new Error('Your cart is empty.')

  const minutes = fulfilment === 'delivery' ? 35 : 15
  const order = {
    id: makeOrderId(),
    createdAt: new Date().toISOString(),
    readyBy: new Date(Date.now() + minutes * 60_000).toISOString(),
    status: 'Preparing',
    fulfilment,
    payment,
    customer,
    totals,
    items: lines.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
  }

  writeJSON(STORAGE_KEY, [order, ...readJSON(STORAGE_KEY, [])])
  return order
}

export async function listOrders() {
  await wait(250)
  return readJSON(STORAGE_KEY, [])
}

export async function getOrder(id) {
  await wait(250)
  return readJSON(STORAGE_KEY, []).find((order) => order.id === id) || null
}
