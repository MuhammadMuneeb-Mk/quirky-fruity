import Button from '@mui/material/Button'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import QuantityStepper from './QuantityStepper'
import { useCart } from '../context/useCart'
import { formatPrice } from '../utils/format'
import './ProductCard.css'

const ProductCard = ({ product, style }) => {
  const { qtyOf, add, setQty } = useCart()
  const qty = qtyOf(product.id)

  return (
    <article className={`product-card product-card--${product.tint}`} style={style}>
      <div className="product-card__art">
        {product.tags.length > 0 && (
          <ul className="product-card__tags" aria-label="Tags">
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
        <img src={product.image} alt="" loading="lazy" width="260" height="200" />
      </div>

      <div className="product-card__body">
        <div className="product-card__heading">
          <h3>{product.name}</h3>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
        <p className="product-card__desc">{product.description}</p>
        <p className="product-card__meta">
          {product.ingredients.join(', ')}
          <br />
          {product.size}, {product.calories} kcal
        </p>

        <div className="product-card__actions">
          {qty === 0 ? (
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<AddShoppingCartIcon />}
              onClick={() => add(product.id)}
            >
              Add to cart
            </Button>
          ) : (
            <div className="product-card__in-cart">
              <QuantityStepper
                value={qty}
                label={product.name}
                onChange={(next) => setQty(product.id, next)}
              />
              <span>in your cart</span>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
