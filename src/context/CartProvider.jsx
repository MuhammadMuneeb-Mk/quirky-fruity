import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { CartContext } from './cart-context'
import { getProduct } from '../data/menu'
import { readJSON, writeJSON } from '../utils/storage'

const STORAGE_KEY = 'qf-cart'
const MAX_QTY = 20

const clamp = (qty) => Math.max(0, Math.min(MAX_QTY, qty))

// cart is stored as { productId: quantity }
function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const qty = clamp((state[action.id] || 0) + action.qty)
      return { ...state, [action.id]: qty }
    }
    case 'set': {
      const qty = clamp(action.qty)
      if (qty === 0) {
        const { [action.id]: _removed, ...rest } = state
        return rest
      }
      return { ...state, [action.id]: qty }
    }
    case 'remove': {
      const { [action.id]: _removed, ...rest } = state
      return rest
    }
    case 'clear':
      return {}
    default:
      return state
  }
}

const loadCart = () => {
  const saved = readJSON(STORAGE_KEY, {})
  // skip items that are not on the menu anymore
  return Object.fromEntries(
    Object.entries(saved).filter(([id, qty]) => getProduct(id) && Number.isInteger(qty) && qty > 0),
  )
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    writeJSON(STORAGE_KEY, items)
  }, [items])

  const add = useCallback((id, qty = 1) => {
    dispatch({ type: 'add', id, qty })
    const product = getProduct(id)
    setNotice({ key: Date.now(), message: `${product.name} added to your cart` })
  }, [])

  const setQty = useCallback((id, qty) => dispatch({ type: 'set', id, qty }), [])
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  const value = useMemo(() => {
    const lines = Object.entries(items).map(([id, qty]) => {
      const product = getProduct(id)
      return { ...product, qty, lineTotal: product.price * qty }
    })
    const count = lines.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0)

    return {
      lines,
      count,
      subtotal,
      qtyOf: (id) => items[id] || 0,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      notice,
      dismissNotice: () => setNotice(null),
    }
  }, [items, isOpen, notice, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
