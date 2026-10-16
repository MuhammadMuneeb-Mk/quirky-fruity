import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { listOrders } from '../services/orders'
import { productImage } from '../data/menu'
import { usePageTitle } from '../hooks/usePageTitle'
import { formatDate, formatPrice } from '../utils/format'
import emptyArt from '../assets/pineapple-fav-section.webp'
import './Orders.css'

const Orders = () => {
  usePageTitle('My orders')
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    let active = true
    listOrders().then((data) => active && setOrders(data))
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="orders-page grid-paper">
      <div className="container">
        <h1 className="orders-title">My orders</h1>
        <p className="orders-sub">Orders placed from this browser are saved here.</p>

        {orders === null ? (
          <div className="orders-list" aria-busy="true" aria-label="Loading orders">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} variant="rounded" height={96} sx={{ borderRadius: '18px' }} />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <img src={emptyArt} alt="" width="120" height="182" />
            <h2>No orders yet</h2>
            <p>When you place an order it will appear here, with its status and receipt.</p>
            <Button component={Link} to="/menu" variant="contained" size="large">
              Order now
            </Button>
          </div>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => {
              const itemCount = order.items.reduce((sum, item) => sum + item.qty, 0)
              return (
                <li key={order.id}>
                  <Link to={`/orders/${order.id}`} className="order-row">
                    <div className="order-row__thumbs" aria-hidden="true">
                      {order.items.slice(0, 3).map((item) => (
                        <img
                          key={item.id}
                          src={productImage(item.id)}
                          alt=""
                          width="44"
                          height="44"
                        />
                      ))}
                    </div>
                    <div className="order-row__info">
                      <strong>{order.id}</strong>
                      <span>
                        {formatDate(order.createdAt)} · {itemCount}{' '}
                        {itemCount === 1 ? 'item' : 'items'} ·{' '}
                        {order.fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}
                      </span>
                    </div>
                    <span className="order-row__total">{formatPrice(order.totals.total)}</span>
                    <ChevronRightIcon />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Orders
