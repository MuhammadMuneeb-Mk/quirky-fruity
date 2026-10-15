import { useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import QuantityStepper from './QuantityStepper'
import { useCart } from '../context/useCart'
import { formatPrice } from '../utils/format'
import { FREE_DELIVERY_FROM } from '../utils/pricing'
import emptyArt from '../assets/pineapple-fav-section.png'
import './CartDrawer.css'

const CartDrawer = () => {
  const { lines, count, subtotal, isOpen, closeCart, setQty, remove } = useCart()
  const navigate = useNavigate()

  const goTo = (path) => {
    closeCart()
    navigate(path)
  }

  const toFreeDelivery = FREE_DELIVERY_FROM - subtotal

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      slotProps={{ paper: { className: 'cart-drawer', 'aria-label': 'Shopping cart' } }}
    >
      <header className="cart-drawer__header">
        <h2>
          Your cart <span>({count})</span>
        </h2>
        <IconButton onClick={closeCart} aria-label="Close cart">
          <CloseIcon />
        </IconButton>
      </header>

      {lines.length === 0 ? (
        <div className="cart-drawer__empty">
          <img src={emptyArt} alt="" width="120" height="182" />
          <h3>Nothing in here yet</h3>
          <p>Pick a juice or a smoothie and it will show up here.</p>
          <Button variant="contained" onClick={() => goTo('/menu')}>
            Browse the menu
          </Button>
        </div>
      ) : (
        <>
          <ul className="cart-drawer__lines">
            {lines.map((line) => (
              <li key={line.id} className="cart-line">
                <div className={`cart-line__thumb product-card--${line.tint}`}>
                  <img src={line.image} alt="" width="64" height="64" />
                </div>
                <div className="cart-line__info">
                  <div className="cart-line__top">
                    <h3>{line.name}</h3>
                    <IconButton
                      size="small"
                      onClick={() => remove(line.id)}
                      aria-label={`Remove ${line.name} from cart`}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </div>
                  <p className="cart-line__unit">
                    {formatPrice(line.price)} · {line.size}
                  </p>
                  <div className="cart-line__bottom">
                    <QuantityStepper
                      size="small"
                      value={line.qty}
                      label={line.name}
                      onChange={(next) => setQty(line.id, next)}
                    />
                    <strong>{formatPrice(line.lineTotal)}</strong>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <footer className="cart-drawer__footer">
            <p className="cart-drawer__delivery">
              {toFreeDelivery > 0
                ? `Add ${formatPrice(toFreeDelivery)} more for free delivery.`
                : 'You get free delivery on this order.'}
            </p>
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <Button variant="contained" size="large" fullWidth onClick={() => goTo('/checkout')}>
              Go to checkout
            </Button>
            <Button color="secondary" fullWidth onClick={() => goTo('/menu')}>
              Keep browsing
            </Button>
          </footer>
        </>
      )}
    </Drawer>
  )
}

export default CartDrawer
