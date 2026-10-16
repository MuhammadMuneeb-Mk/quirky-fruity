import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { getOrder } from '../services/orders'
import { getProduct, productImage } from '../data/menu'
import { useCart } from '../context/useCart'
import { usePageTitle } from '../hooks/usePageTitle'
import { formatDate, formatPrice } from '../utils/format'
import celebrateArt from '../assets/fresh-fruit-img-bottom.webp'
import './Orders.css'

const OrderDetail = () => {
  const { orderId } = useParams()
  const { state } = useLocation()
  const justPlaced = Boolean(state?.justPlaced)
  // undefined = loading, null = not found
  const [order, setOrder] = useState(undefined)
  const { add, openCart, dismissNotice } = useCart()
  usePageTitle(`Order ${orderId}`)

  // put the same drinks back in the cart (skips anything no longer on the menu)
  const orderAgain = () => {
    order.items.filter((item) => getProduct(item.id)).forEach((item) => add(item.id, item.qty))
    dismissNotice()
    openCart()
  }

  useEffect(() => {
    let active = true
    getOrder(orderId).then((data) => active && setOrder(data))
    return () => {
      active = false
    }
  }, [orderId])

  if (order === undefined) {
    return (
      <div className="orders-page grid-paper">
        <div className="container order-detail" aria-busy="true">
          <Skeleton variant="text" width="60%" height={72} />
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: '18px', mt: 3 }} />
        </div>
      </div>
    )
  }

  if (order === null) {
    return (
      <div className="orders-page grid-paper">
        <div className="container orders-empty">
          <h1 className="orders-title">We couldn’t find order {orderId}</h1>
          <p>
            Orders are stored in the browser they were placed from. Check the ID, or see all your
            orders.
          </p>
          <Button component={Link} to="/orders" variant="contained" size="large">
            See my orders
          </Button>
        </div>
      </div>
    )
  }

  const isDelivery = order.fulfilment === 'delivery'

  return (
    <div className="orders-page grid-paper">
      <div className="container order-detail">
        {justPlaced ? (
          <div className="order-success" role="status">
            <CheckCircleIcon sx={{ fontSize: 40 }} />
            <div>
              <h1>Thanks, {order.customer.name.split(' ')[0]}. Your order is in.</h1>
              <p>
                We’re blending it now. It should be{' '}
                {isDelivery ? 'at your door' : 'ready at the counter'} by{' '}
                <strong>
                  {new Date(order.readyBy).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </strong>
                .
              </p>
            </div>
          </div>
        ) : (
          <>
            <Link to="/orders" className="order-back">
              ← All orders
            </Link>
            <h1 className="orders-title">Order {order.id}</h1>
          </>
        )}

        <div className="receipt">
          <div className="receipt__head">
            <div>
              <span>Order</span>
              <strong>{order.id}</strong>
            </div>
            <div>
              <span>Placed</span>
              <strong>{formatDate(order.createdAt)}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong className="receipt__status">{order.status}</strong>
            </div>
          </div>

          <ul className="receipt__items">
            {order.items.map((item) => (
              <li key={item.id}>
                <img src={productImage(item.id)} alt="" width="48" height="48" />
                <span className="receipt__name">
                  {item.qty} × {item.name}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <dl className="receipt__totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(order.totals.subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>
                {isDelivery
                  ? order.totals.delivery
                    ? formatPrice(order.totals.delivery)
                    : 'Free'
                  : 'Pickup'}
              </dd>
            </div>
            <div className="receipt__grand">
              <dt>Total ({order.payment === 'card' ? 'card' : 'cash'})</dt>
              <dd>{formatPrice(order.totals.total)}</dd>
            </div>
          </dl>

          <div className="receipt__customer">
            <div>
              <span>{isDelivery ? 'Delivering to' : 'Pickup for'}</span>
              <p>{order.customer.name}</p>
              {isDelivery && <p>{order.customer.address}</p>}
            </div>
            <div>
              <span>Contact</span>
              <p>{order.customer.phone}</p>
              <p>{order.customer.email}</p>
            </div>
            {order.customer.notes && (
              <div>
                <span>Notes</span>
                <p>{order.customer.notes}</p>
              </div>
            )}
          </div>
        </div>

        <div className="order-actions">
          {justPlaced ? (
            <Button component={Link} to="/menu" variant="contained" size="large">
              Order something else
            </Button>
          ) : (
            <Button variant="contained" size="large" onClick={orderAgain}>
              Order again
            </Button>
          )}
          <Button component={Link} to="/orders" color="secondary" size="large">
            See all orders
          </Button>
        </div>

        {justPlaced && (
          <img className="order-celebrate" src={celebrateArt} alt="" width="630" height="200" />
        )}
      </div>
    </div>
  )
}

export default OrderDetail
